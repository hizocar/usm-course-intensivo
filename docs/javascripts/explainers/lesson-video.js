/*
 * lesson-video: a narrated motion graphic that walks through a whole class.
 *
 *   <div class="hz-widget" data-widget="lesson-video" data-lesson="s2">
 *     <p>Video de la clase: abre esta clase en el sitio del curso.</p>
 *   </div>
 *
 * The voice track is one MP3 per part. media/<lesson>/timeline.json says when
 * each scene starts, when each of its beats fires, and what is being said
 * (for the subtitles). The scenes live in explainers/video-<lesson>.js and
 * register with HZ.video.scenes(lesson, {...}).
 *
 * Every scene draws itself as a pure function of time (update(node, T)), so
 * playing, seeking, scrubbing and frame-by-frame export all show the same
 * picture. The stage is a fixed 1280×720 canvas scaled to the player width.
 *
 * Export: open a page with ?lv-render; window.__lv.seek(part, t) draws a frame.
 */
(function () {
  const { el } = HZ;
  const SCRIPT = document.currentScript.src;
  const MEDIA = new URL("../../media/", SCRIPT).href;
  const W = 1280;
  const H = 720;
  const RENDER = /[?&]lv-render\b/.test(location.search);

  const packs = {};
  const waiting = {};

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // ---------- Kit: small helpers the scene packs share ----------

  const nf = (n, d = 0) =>
    Number(n).toLocaleString("es-CL", { minimumFractionDigits: d, maximumFractionDigits: d });

  // Python syntax colouring, enough for one-liners on screen.
  const PY = /("[^"]*"|'[^']*')|(#.*$)|\b(import|as|from|def|return|for|in|if|else|True|False|None|and|or|not|try|except|print)\b|(\b\d[\d_]*\.?\d*\b)|(\.[A-Za-z_]\w*(?=\())|([()[\]{}])/gm;
  function highlight(line) {
    const out = [];
    let last = 0;
    line.replace(PY, (m, str, com, kw, num, meth, br, i) => {
      if (i > last) out.push(document.createTextNode(line.slice(last, i)));
      const cls = str ? "s" : com ? "c" : kw ? "k" : num ? "n" : meth ? "m" : "b";
      out.push(el("span", { class: "lv-py-" + cls, text: m }));
      last = i + m.length;
      return m;
    });
    if (last < line.length) out.push(document.createTextNode(line.slice(last)));
    return out;
  }

  const kit = {
    W, H, el, nf, clamp, easeOut, easeInOut,
    svg: HZ.svg,

    // Fade + rise in as p goes 0 → 1. Also handles "gone" (p = 0 → hidden).
    show(node, p, dy = 18, dx = 0) {
      node.style.opacity = p;
      node.style.transform = p >= 1 ? "" : `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`;
      node.style.visibility = p <= 0 ? "hidden" : "";
    },
    // Scale pop for badges and stamps.
    pop(node, p) {
      const s = p <= 0 ? 0.6 : 0.6 + 0.4 * easeOut(p) + Math.sin(p * Math.PI) * 0.08;
      node.style.opacity = clamp(p * 2, 0, 1);
      node.style.transform = `scale(${s})`;
      node.style.visibility = p <= 0 ? "hidden" : "";
    },
    count(node, from, to, p, fmt = (v) => nf(v)) {
      node.textContent = fmt(from + (to - from) * easeOut(clamp(p, 0, 1)));
    },
    toggle(node, cls, on) {
      node.classList.toggle(cls, !!on);
    },

    // Header shared by every scene: section number, kicker, serif title.
    head(num, kicker, title) {
      return el("header", { class: "lv-head" }, [
        el("div", { class: "lv-kicker" }, [el("b", { text: num }), kicker]),
        el("h2", { class: "lv-title", text: title }),
      ]);
    },

    // Code block. Returns {node, lines[]}; reveal lines with kit.typeLine.
    code(lines, opts = {}) {
      const rows = lines.map((l) => el("div", { class: "lv-code__line" }, highlight(l)));
      const node = el("pre", { class: "lv-code" + (opts.cls ? " " + opts.cls : "") }, rows);
      return { node, lines: rows };
    },
    // Typewriter on one code line: monospace, so clipping by width is exact.
    typeLine(line, p) {
      const q = clamp(p, 0, 1);
      line.style.visibility = q <= 0 ? "hidden" : "";
      line.style.clipPath = q >= 1 ? "" : `inset(0 ${(1 - q) * 100}% 0 0)`;
    },
    // Output line under code (pandas result).
    out(text, cls) {
      return el("div", { class: "lv-out" + (cls ? " " + cls : ""), text });
    },

    // Data table. rows are arrays; returns {node, cells[r][c], rows[r], head[c]}.
    table(head, rows, opts = {}) {
      const hc = head.map((h) => el("th", { text: h }));
      const cells = [];
      const trs = rows.map((r) => {
        const tds = r.map((v) => el("td", { text: v }));
        cells.push(tds);
        return el("tr", {}, tds);
      });
      const node = el("table", { class: "lv-table" + (opts.cls ? " " + opts.cls : "") }, [
        el("thead", {}, el("tr", {}, hc)),
        el("tbody", {}, trs),
      ]);
      return { node, cells, rows: trs, head: hc };
    },

    pill(text, cls) {
      return el("span", { class: "lv-pill" + (cls ? " " + cls : ""), text });
    },
    card(children, cls) {
      return el("div", { class: "lv-card" + (cls ? " " + cls : "") }, children);
    },
    abs(node, x, y, w) {
      node.style.position = "absolute";
      node.style.left = x + "px";
      node.style.top = y + "px";
      if (w) node.style.width = w + "px";
      return node;
    },
  };

  // T: the time object a scene's update() receives.
  function timeFor(lt, scene) {
    const beats = scene.beats || {};
    const at = (b) => (typeof b === "number" ? b : b in beats ? beats[b] : Infinity);
    return {
      t: lt,
      dur: scene.dur,
      at,
      // Linear progress 0 → 1 over `d` seconds starting at beat b (+ delay).
      lin: (b, d = 0.6, delay = 0) => clamp((lt - at(b) - delay) / d, 0, 1),
      // Eased progress, the usual choice for entrances.
      p: (b, d = 0.6, delay = 0) => easeOut(clamp((lt - at(b) - delay) / d, 0, 1)),
      on: (b, delay = 0) => lt >= at(b) + delay,
      // Fraction of the scene still to go: lets scenes fade out at the end.
      out: (d = 0.35) => clamp((scene.dur - lt) / d, 0, 1),
    };
  }

  // ---------- Player ----------

  function fmtTime(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function store(key, value) {
    try {
      if (value === undefined) return JSON.parse(localStorage.getItem(key) || "null");
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      return null;
    }
  }

  function mountPlayer(body, lesson, timeline, pack) {
    const parts = timeline.parts;
    let pi = 0; // current part
    let cur = -1; // current scene index
    let playing = false;
    let raf = 0;
    let clock = 0; // fallback clock when audio is unavailable
    let clockAt = 0;
    let rate = 1;
    let ccOn = !/[?&]lv-nocc\b/.test(location.search);
    const built = {}; // part:scene -> {node, state}

    // Stage
    const stage = el("div", { class: "lv-stage" });
    const cc = el("div", { class: "lv-cc", "aria-live": "off" });
    const bigPlay = el("button", { type: "button", class: "lv-bigplay", "aria-label": "Reproducir" }, [
      el("span", { class: "lv-bigplay__icon" }),
      el("span", { class: "lv-bigplay__label", text: "Ver la clase" }),
    ]);
    const screen = el("div", { class: "lv-screen", tabindex: "0" }, [stage, cc, bigPlay]);

    // Controls
    const playBtn = el("button", { type: "button", class: "lv-btn lv-btn--play", "aria-label": "Reproducir" });
    const timeOut = el("span", { class: "lv-time", text: "0:00 / 0:00" });
    const fill = el("div", { class: "lv-progress__fill" });
    const ticks = el("div", { class: "lv-progress__ticks" });
    const progress = el("div", { class: "lv-progress", role: "slider", tabindex: "0", "aria-label": "Posición" }, [ticks, fill]);
    const ccBtn = el("button", { type: "button", class: "lv-btn lv-btn--text", "aria-pressed": String(ccOn), text: "CC" });
    const rateBtn = el("button", { type: "button", class: "lv-btn lv-btn--text", text: "1×" });
    const fsBtn = el("button", { type: "button", class: "lv-btn lv-btn--fs", "aria-label": "Pantalla completa" });
    const bar = el("div", { class: "lv-bar" }, [playBtn, timeOut, progress, ccBtn, rateBtn, fsBtn]);

    const tabs = parts.map((p, i) =>
      el("button", { type: "button", class: "lv-tab", onclick: () => switchPart(i, 0, playing) }, [
        el("b", { text: p.label }),
        el("span", { text: p.title + " · " + fmtTime(p.duration) }),
      ])
    );
    const chapters = el("ol", { class: "lv-chapters" });
    const side = el("div", { class: "lv-side" }, [el("div", { class: "lv-tabs" }, tabs), chapters]);

    const head = el("div", { class: "lv-intro" }, [
      el("span", { class: "lv-intro__kicker", text: timeline.kicker || "Video de la clase" }),
      el("span", { class: "lv-intro__title", text: timeline.title || "" }),
      timeline.lede ? el("p", { class: "lv-intro__lede", text: timeline.lede }) : null,
    ]);

    const root = el("div", { class: "lv" + (RENDER ? " lv--render" : "") }, [
      head,
      el("div", { class: "lv-main" }, [el("div", { class: "lv-player" }, [screen, bar]), side]),
    ]);
    body.append(root);

    const audio = new Audio();
    audio.preload = "metadata";
    let audioOk = true;
    audio.addEventListener("error", () => (audioOk = false));
    audio.addEventListener("ended", () => {
      if (pi < parts.length - 1) switchPart(pi + 1, 0, true);
      else pause();
    });

    function now() {
      if (audioOk && audio.src && !RENDER) return audio.currentTime;
      return playing ? clock + ((performance.now() - clockAt) / 1000) * rate : clock;
    }

    function setTime(t) {
      t = clamp(t, 0, parts[pi].duration);
      clock = t;
      clockAt = performance.now();
      if (audioOk && audio.src) {
        try {
          audio.currentTime = t;
        } catch (e) {
          /* not seekable yet */
        }
      }
      render(t);
    }

    function sceneAt(t) {
      const sc = parts[pi].scenes;
      for (let i = sc.length - 1; i >= 0; i--) if (t >= sc[i].start) return i;
      return 0;
    }

    function getNode(i) {
      const key = pi + ":" + i;
      if (built[key]) return built[key];
      const scene = parts[pi].scenes[i];
      const def = pack[scene.id];
      const node = el("div", { class: "lv-scene lv-scene--" + scene.id });
      const state = def ? def.build(node, kit) || {} : {};
      if (!def) node.append(el("p", { class: "lv-missing", text: "Escena " + scene.id }));
      stage.append(node);
      built[key] = { node, state, def };
      return built[key];
    }

    function render(t) {
      const part = parts[pi];
      const i = sceneAt(t);
      if (i !== cur) {
        Object.entries(built).forEach(([k, b]) => (b.node.style.display = k === pi + ":" + i ? "" : "none"));
        cur = i;
        chapters.querySelectorAll("li").forEach((li, j) => li.classList.toggle("is-on", j === i));
      }
      const scene = part.scenes[i];
      const b = getNode(i);
      b.node.style.display = "";
      const lt = t - scene.start;
      const T = timeFor(lt, scene);
      // Scene entrance/exit: a soft fade so cuts never feel abrupt.
      const fadeIn = i === 0 ? 1 : easeOut(clamp(lt / 0.45, 0, 1)); // the first scene doubles as the poster
      b.node.style.opacity = Math.min(fadeIn, T.out(0.3) * 0.6 + 0.4);
      if (b.def) b.def.update(b.state, T, kit);

      // Subtitles: the cue whose start has passed.
      let line = "";
      for (const [s, text] of scene.cues || []) if (lt >= s) line = text;
      cc.textContent = ccOn ? line : "";
      cc.style.visibility = ccOn && line ? "" : "hidden";

      fill.style.width = (100 * t) / part.duration + "%";
      timeOut.textContent = fmtTime(t) + " / " + fmtTime(part.duration);
      progress.setAttribute("aria-valuenow", Math.round(t));
      if (!RENDER && Math.abs(t - (store.lastSaved || 0)) > 3) {
        store.lastSaved = t;
        store("lv:" + lesson + ":" + pi, t);
      }
    }

    function loop() {
      render(now());
      if (playing) raf = requestAnimationFrame(loop);
    }

    function play() {
      if (playing) return;
      playing = true;
      root.classList.add("is-playing");
      bigPlay.hidden = true;
      playBtn.setAttribute("aria-label", "Pausa");
      clockAt = performance.now();
      if (audioOk && audio.src) {
        audio.playbackRate = rate;
        audio.play().catch(() => (audioOk = false));
      }
      raf = requestAnimationFrame(loop);
    }

    function pause() {
      clock = now();
      playing = false;
      root.classList.remove("is-playing");
      playBtn.setAttribute("aria-label", "Reproducir");
      audio.pause();
      cancelAnimationFrame(raf);
      render(clock);
    }

    function switchPart(i, t, autoplay) {
      const wasPlaying = playing || autoplay;
      if (playing) pause();
      pi = i;
      cur = -1;
      Object.values(built).forEach((b) => (b.node.style.display = "none"));
      tabs.forEach((tb, j) => tb.setAttribute("aria-pressed", String(j === i)));
      ticks.replaceChildren(
        ...parts[i].scenes.slice(1).map((s) => {
          const tk = el("i");
          tk.style.left = (100 * s.start) / parts[i].duration + "%";
          return tk;
        })
      );
      chapters.replaceChildren(
        ...parts[i].scenes.map((s) =>
          el("li", { onclick: () => { setTime(s.start + 0.01); } }, [
            el("span", { class: "lv-chapters__t", text: fmtTime(s.start) }),
            el("span", { text: s.title }),
          ])
        )
      );
      audioOk = true;
      if (!RENDER && parts[i].audio) audio.src = new URL(parts[i].audio, MEDIA + lesson + "/").href;
      setTime(t || 0);
      if (wasPlaying && autoplay !== false) play();
    }

    // Wiring
    const toggle = () => (playing ? pause() : play());
    playBtn.addEventListener("click", toggle);
    bigPlay.addEventListener("click", play);
    stage.addEventListener("click", toggle);
    ccBtn.addEventListener("click", () => {
      ccOn = !ccOn;
      ccBtn.setAttribute("aria-pressed", String(ccOn));
      render(now());
    });
    const RATES = [1, 1.25, 1.5, 0.85];
    rateBtn.addEventListener("click", () => {
      rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
      rateBtn.textContent = String(rate).replace(".", ",") + "×";
      clock = now();
      clockAt = performance.now();
      audio.playbackRate = rate;
    });
    fsBtn.addEventListener("click", () => {
      const fs = document.fullscreenElement;
      if (fs) document.exitFullscreen();
      else if (screen.requestFullscreen) screen.requestFullscreen();
    });

    function seekFromEvent(e) {
      const r = progress.getBoundingClientRect();
      setTime(((e.clientX - r.left) / r.width) * parts[pi].duration);
    }
    progress.addEventListener("pointerdown", (e) => {
      progress.setPointerCapture(e.pointerId);
      seekFromEvent(e);
      const move = (ev) => seekFromEvent(ev);
      progress.addEventListener("pointermove", move);
      progress.addEventListener("pointerup", () => progress.removeEventListener("pointermove", move), { once: true });
    });
    const keys = (e) => {
      if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); setTime(now() + 5); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); setTime(now() - 5); }
    };
    screen.addEventListener("keydown", keys);
    progress.addEventListener("keydown", keys);

    // Scale the 1280×720 stage to the screen width.
    const fit = () => {
      const s = screen.clientWidth / W;
      stage.style.transform = `scale(${s})`;
      screen.style.setProperty("--lv-s", s);
    };
    new ResizeObserver(fit).observe(screen);
    fit();

    // Stop when the page navigates away (Material instant navigation).
    const watch = setInterval(() => {
      if (!root.isConnected) {
        audio.pause();
        playing = false;
        clearInterval(watch);
      }
    }, 1000);

    const saved = store("lv:" + lesson + ":0");
    switchPart(0, saved && saved < parts[0].duration - 5 ? saved : 0, false);

    if (RENDER) {
      window.__lv = {
        parts: parts.map((p) => ({ duration: p.duration, audio: p.audio })),
        seek(i, t) {
          if (i !== pi) switchPart(i, t, false);
          clock = t;
          render(t);
        },
      };
    }
  }

  function loadPack(lesson, cb) {
    if (packs[lesson]) return cb();
    (waiting[lesson] = waiting[lesson] || []).push(cb);
    if (waiting[lesson].length > 1) return;
    document.head.append(el("script", { src: new URL("video-" + lesson + ".js", SCRIPT).href, async: true }));
  }

  HZ.video = {
    kit,
    scenes(lesson, defs) {
      packs[lesson] = defs;
      (waiting[lesson] || []).splice(0).forEach((f) => f());
    },
  };

  HZ.register("lesson-video", {
    bare: true,
    mount(body, data) {
      const lesson = data.lesson;
      body.classList.add("lv-host");
      const note = el("p", { class: "lv-loading", text: "Cargando el video de la clase…" });
      body.append(note);
      fetch(MEDIA + lesson + "/timeline.json")
        .then((r) => {
          if (!r.ok) throw new Error("timeline " + r.status);
          return r.json();
        })
        .then((timeline) =>
          loadPack(lesson, () => {
            note.remove();
            mountPlayer(body, lesson, timeline, packs[lesson]);
          })
        )
        .catch((err) => {
          note.textContent = "No se pudo cargar el video de la clase (" + err.message + ").";
          console.error(err);
        });
    },
    css: `
.lv-host { --lv-bg: #15130f; --lv-card: #1f1b16; --lv-ink: #efe8dc; --lv-muted: #a39a8c; --lv-line: rgba(239,232,220,.14);
  --lv-a: #f08a4b; --lv-a-soft: rgba(240,138,75,.18); --lv-b: #6cbfc6; --lv-b-soft: rgba(108,191,198,.18);
  --lv-good: #8cc784; --lv-bad: #ff8a73; --lv-c: #d6b25e; --lv-d: #b49ad9; }
.md-typeset .lv-host { margin: 1.4rem 0 2rem; }
.lv-loading { font-size: .75rem; color: var(--md-default-fg-color--light); }
.lv-intro { display: flex; flex-direction: column; gap: .15rem; margin-bottom: .8rem; }
.lv-intro__kicker { font-family: var(--md-code-font); font-size: .62rem; letter-spacing: .04em; text-transform: uppercase; color: var(--md-primary-fg-color); }
.lv-intro__title { font-family: var(--hz-serif); font-size: 1.7rem; line-height: 1.1; color: var(--md-default-fg-color); }
.md-typeset .lv-intro__lede { margin: .3rem 0 0; font-size: .78rem; color: var(--md-default-fg-color--light); max-width: 46em; }
.lv-host { container-type: inline-size; }
.lv-main { display: grid; grid-template-columns: minmax(0, 1fr) 15rem; gap: 1rem; align-items: start; }
.lv-player { border-radius: 14px; overflow: hidden; background: var(--lv-bg); border: 1px solid var(--hz-line, rgba(0,0,0,.12)); }
.lv-screen { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: var(--lv-bg); outline: none; }
.lv-screen:fullscreen { aspect-ratio: auto; display: grid; place-items: center; }
.lv-stage { position: absolute; left: 0; top: 0; width: 1280px; height: 720px; transform-origin: 0 0; color: var(--lv-ink);
  font-family: var(--md-text-font, "Geist", system-ui, sans-serif); font-size: 22px; line-height: 1.35; cursor: pointer;
  background: radial-gradient(1200px 600px at 85% -10%, rgba(240,138,75,.10), transparent 60%), var(--lv-bg); }
.lv-scene { position: absolute; inset: 0; padding: 54px 72px 96px; }
.lv-missing { color: var(--lv-muted); }
.lv-cc { position: absolute; left: 50%; bottom: calc(14px + 8px * var(--lv-s, 1)); transform: translateX(-50%); max-width: 88%;
  padding: .25em .7em; border-radius: 8px; background: rgba(10,9,7,.78); color: #fff;
  font-size: calc(19px * var(--lv-s, 1)); line-height: 1.35; text-align: center; pointer-events: none; }
.lv-bigplay { position: absolute; inset: 0; margin: auto; width: max-content; height: max-content; display: flex; align-items: center; gap: .7em;
  padding: .8em 1.4em .8em 1em; border-radius: 999px; border: 0; cursor: pointer; background: var(--lv-a); color: #1a120b;
  font: 600 .9rem/1 var(--md-text-font, system-ui); box-shadow: 0 10px 40px rgba(0,0,0,.45); }
.lv-bigplay:hover { filter: brightness(1.06); }
.lv-bigplay__icon { width: 0; height: 0; border-left: 14px solid currentColor; border-top: 9px solid transparent; border-bottom: 9px solid transparent; }
.lv-bar { display: flex; align-items: center; gap: .7rem; padding: .5rem .8rem; background: #0f0d0a; color: #efe8dc; font-size: .68rem; }
.lv-btn { appearance: none; border: 0; background: none; color: inherit; cursor: pointer; padding: .3rem; border-radius: 6px; font: 600 .66rem/1 var(--md-code-font, monospace); }
.lv-btn:hover { background: rgba(255,255,255,.08); }
.lv-btn:focus-visible, .lv-progress:focus-visible, .lv-screen:focus-visible { outline: 2px solid var(--lv-a); outline-offset: 2px; }
.lv-btn--text[aria-pressed="false"] { opacity: .5; }
.lv-btn--play { width: 1.9rem; height: 1.9rem; display: grid; place-items: center; }
.lv-btn--play::before { content: ""; border-left: 11px solid currentColor; border-top: 7px solid transparent; border-bottom: 7px solid transparent; margin-left: 3px; }
.is-playing .lv-btn--play::before { border: 0; width: 10px; height: 12px; margin: 0; background: linear-gradient(90deg, currentColor 0 35%, transparent 35% 65%, currentColor 65%); }
.lv-btn--fs { width: 1.9rem; height: 1.9rem; position: relative; }
.lv-btn--fs::before { content: ""; position: absolute; inset: .55rem; border: 2px solid currentColor; border-radius: 2px; clip-path: polygon(0 0,35% 0,35% 20%,20% 20%,20% 35%,0 35%,0 0, 65% 0,100% 0,100% 35%,80% 35%,80% 20%,65% 20%, 65% 0, 100% 65%,100% 100%,65% 100%,65% 80%,80% 80%,80% 65%,100% 65%, 0 65%,20% 65%,20% 80%,35% 80%,35% 100%,0 100%); }
.lv-time { font-family: var(--md-code-font, monospace); font-variant-numeric: tabular-nums; white-space: nowrap; opacity: .85; }
.lv-progress { position: relative; flex: 1; height: 6px; border-radius: 999px; background: rgba(255,255,255,.16); cursor: pointer; touch-action: none; }
.lv-progress::after { content: ""; position: absolute; inset: -8px 0; }
.lv-progress__fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 999px; background: var(--lv-a); pointer-events: none; }
.lv-progress__ticks i { position: absolute; top: -2px; width: 2px; height: 10px; background: rgba(255,255,255,.35); border-radius: 1px; }
.lv-side { display: flex; flex-direction: column; gap: .6rem; }
.lv-tabs { display: flex; flex-direction: column; gap: .35rem; }
.lv-tab { appearance: none; text-align: left; display: flex; flex-direction: column; gap: .1rem; padding: .5rem .7rem; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--hz-line, rgba(0,0,0,.12)); background: var(--hz-surface, #ebe4d8); color: var(--md-default-fg-color); font: inherit; }
.lv-tab b { font-size: .7rem; }
.lv-tab span { font-size: .62rem; color: var(--md-default-fg-color--light); }
.lv-tab[aria-pressed="true"] { border-color: var(--md-primary-fg-color); box-shadow: inset 3px 0 0 var(--md-primary-fg-color); }
.md-typeset ol.lv-chapters { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; max-height: 22rem; overflow: auto; }
.md-typeset ol.lv-chapters li { margin: 0; display: grid; grid-template-columns: 2.6em 1fr; gap: .4rem; padding: .3rem .45rem; border-radius: 7px; cursor: pointer;
  font-size: .64rem; line-height: 1.3; color: var(--md-default-fg-color--light); }
.md-typeset ol.lv-chapters li:hover { background: var(--hz-surface, #ebe4d8); color: var(--md-default-fg-color); }
.md-typeset ol.lv-chapters li.is-on { color: var(--md-default-fg-color); background: color-mix(in srgb, var(--md-primary-fg-color) 12%, transparent); }
.lv-chapters__t { font-family: var(--md-code-font, monospace); color: var(--md-primary-fg-color); }

/* Narrow hosts (the notebook column, phones): chapters go under the player */
@container (max-width: 52rem) {
  .lv-main { grid-template-columns: minmax(0, 1fr); }
  .lv-tabs { flex-direction: row; }
  .lv-tab { flex: 1; }
  .md-typeset ol.lv-chapters { display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); max-height: none; }
  .lv-progress__ticks { display: none; }
}
@container (min-width: 30rem) and (max-width: 52rem) { .lv-progress__ticks { display: block; } }

/* Render mode: the stage alone, for frame export */
.lv--render .lv-intro, .lv--render .lv-bar, .lv--render .lv-side, .lv--render .lv-bigplay { display: none !important; }
.lv--render .lv-main { display: block; }
.lv--render .lv-player { border: 0; border-radius: 0; }
.lv--render .lv-stage { cursor: default; }

/* ---------- Stage typography & primitives ---------- */
.lv-head { margin-bottom: 26px; }
.lv-kicker { font-family: var(--md-code-font, monospace); font-size: 15px; letter-spacing: .06em; text-transform: uppercase; color: var(--lv-muted); display: flex; gap: 12px; align-items: center; }
.lv-kicker b { color: var(--lv-a); font-weight: 500; }
.md-typeset .lv-stage h2.lv-title, .lv-title { font-family: var(--hz-serif, Georgia, serif); font-weight: 400; font-size: 54px; line-height: 1.05; margin: 8px 0 0; color: var(--lv-ink); letter-spacing: -.01em; border: 0; padding: 0; }
.lv-stage p { margin: 0; }
.md-typeset .lv-stage pre.lv-code, .lv-code { margin: 0; padding: 18px 22px; border-radius: 14px; background: #0d0c09; border: 1px solid var(--lv-line);
  font-family: var(--md-code-font, monospace); font-size: 21px; line-height: 1.6; color: #e9e1d3; white-space: pre; overflow: hidden; }
.lv-code__line { min-height: 1.6em; }
.lv-py-s { color: #a8d38a; } .lv-py-k { color: #f08a4b; } .lv-py-n { color: #d6b25e; } .lv-py-c { color: #7d7468; font-style: italic; }
.lv-py-m { color: #6cbfc6; } .lv-py-b { color: #b8afa1; }
.lv-out { font-family: var(--md-code-font, monospace); font-size: 21px; padding: 10px 22px; color: var(--lv-ink); border-left: 3px solid var(--lv-a); margin-top: 12px; }
.lv-out.is-err { color: var(--lv-bad); border-color: var(--lv-bad); }
.lv-out.is-ok { color: var(--lv-good); border-color: var(--lv-good); }
.md-typeset .lv-stage table.lv-table, .lv-table { border-collapse: separate; border-spacing: 0; font-family: var(--md-code-font, monospace); font-size: 18px; color: var(--lv-ink);
  background: var(--lv-card); border: 1px solid var(--lv-line); border-radius: 12px; overflow: hidden; display: table; margin: 0; }
.md-typeset .lv-stage .lv-table th, .lv-table th { background: rgba(255,255,255,.04); color: var(--lv-muted); font-weight: 500; text-align: left; padding: 9px 14px; border-bottom: 1px solid var(--lv-line); font-size: 16px; min-width: 0; }
.md-typeset .lv-stage .lv-table td, .lv-table td { padding: 8px 14px; border: 0; border-bottom: 1px solid rgba(239,232,220,.06); transition: background-color .25s, color .25s; }
.lv-table tr:last-child td { border-bottom: 0; }
.lv-table td.is-bad, .lv-table th.is-bad { color: var(--lv-bad); background: rgba(255,138,115,.13); }
.lv-table td.is-good { color: var(--lv-good); background: rgba(140,199,132,.12); }
.lv-table td.is-a, .lv-table th.is-a { color: var(--lv-a); background: var(--lv-a-soft); }
.lv-table td.is-b, .lv-table th.is-b { color: var(--lv-b); background: var(--lv-b-soft); }
.lv-table tr.is-dim td { opacity: .25; }
.lv-pill { white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid var(--lv-line); font-size: 17px; color: var(--lv-ink); background: rgba(255,255,255,.03); }
.lv-pill.is-a { border-color: var(--lv-a); color: var(--lv-a); background: var(--lv-a-soft); }
.lv-pill.is-b { border-color: var(--lv-b); color: var(--lv-b); background: var(--lv-b-soft); }
.lv-pill.is-bad { border-color: var(--lv-bad); color: var(--lv-bad); background: rgba(255,138,115,.12); }
.lv-pill.is-good { border-color: var(--lv-good); color: var(--lv-good); background: rgba(140,199,132,.12); }
.lv-card { background: var(--lv-card); border: 1px solid var(--lv-line); border-radius: 16px; padding: 20px 24px; }
.lv-big { font-family: var(--hz-serif, Georgia, serif); font-size: 84px; line-height: 1; color: var(--lv-a); }
.lv-muted { color: var(--lv-muted); }
.lv-mono { font-family: var(--md-code-font, monospace); }
.lv-stage svg text { font-family: var(--md-code-font, monospace); }
`,
  });
})();
