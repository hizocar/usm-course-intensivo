/*
 * Scenes for the Session 2 video (lesson-video.js). Each scene builds its DOM
 * once and then draws itself from the time object T:
 *   T.p(beat, seconds, delay)  eased 0 → 1 after a beat fires
 *   T.lin(...)                 same, linear
 *   T.on(beat)                 has the beat fired?
 * Beat names match the {b:name} marks in the narration script.
 * Numbers come from the class notebook (Session_2_Cleaning.ipynb).
 */
(function () {
  const k = HZ.video.kit;
  const { el, nf, show, pop, count } = k;
  const S = (tag, attrs, kids) => k.svg(tag, attrs, kids);
  const pct = (v, d = 1) => nf(v, d) + " %";

  // Scene body below the header: absolute box we can lay out inside.
  function frame(node, num, kicker, title) {
    node.append(k.head(num, kicker, title));
    const body = el("div", { class: "s2-body" });
    node.append(body);
    return body;
  }
  const fadeOutAfter = (T, beat, d = 0.5) => 1 - T.p(beat, d);

  const CSS = `
.s2-body { position: absolute; left: 72px; right: 72px; top: 196px; bottom: 92px; }
.s2-row { display: flex; gap: 20px; align-items: stretch; }
.s2-col { display: flex; flex-direction: column; gap: 14px; }
.s2-label { font-size: 17px; color: var(--lv-muted); }
.s2-label b { color: var(--lv-ink); font-weight: 600; }
.s2-q { font-size: 27px; line-height: 1.25; color: var(--lv-ink); margin-top: 6px; }
.s2-team { font-family: var(--md-code-font, monospace); font-size: 15px; text-transform: uppercase; letter-spacing: .05em; }
.s2-team.is-a { color: var(--lv-a); } .s2-team.is-b { color: var(--lv-b); }
.s2-stamp { position: absolute; padding: 10px 22px; border: 3px solid var(--lv-bad); color: var(--lv-bad); border-radius: 12px;
  font: 600 34px/1 var(--md-code-font, monospace); text-transform: uppercase; letter-spacing: .06em; background: rgba(21,19,15,.9); transform-origin: center; }
.s2-step { display: flex; align-items: center; gap: 16px; font-size: 30px; }
.s2-step i { font-style: normal; display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; border: 2px solid var(--lv-a); color: var(--lv-a); font: 500 24px/1 var(--md-code-font, monospace); flex: none; }
.s2-num { font-family: var(--hz-serif, Georgia, serif); font-size: 96px; line-height: .95; color: var(--lv-a); font-variant-numeric: tabular-nums; }
.s2-num.is-b { color: var(--lv-b); }
.s2-num.is-bad { color: var(--lv-bad); }
.s2-num.is-good { color: var(--lv-good); }
.s2-arrow { color: var(--lv-a); font-family: var(--md-code-font, monospace); font-size: 18px; }
.s2-chip { font-family: var(--md-code-font, monospace); font-size: 20px; padding: 8px 16px; border-radius: 10px; border: 1px solid var(--lv-line); background: var(--lv-card); }
.s2-chip.is-on { border-color: var(--lv-a); color: var(--lv-a); background: var(--lv-a-soft); }
.s2-chip.is-good { border-color: var(--lv-good); color: var(--lv-good); }
.s2-chip.is-bad { border-color: var(--lv-bad); color: var(--lv-bad); }
.lv-table.is-compact td { padding: 5px 14px; }
.lv-table.is-compact th { padding: 6px 14px; }
.s2-note { font-size: 21px; color: var(--lv-ink); border-left: 3px solid var(--lv-a); padding: 4px 0 4px 16px; }
.s2-note.is-b { border-color: var(--lv-b); } .s2-note.is-bad { border-color: var(--lv-bad); } .s2-note.is-good { border-color: var(--lv-good); }
.s2-banner { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 22px; border-radius: 14px; background: var(--lv-a); color: #1a120b; font-size: 24px; font-weight: 600; }
.s2-banner.is-b { background: var(--lv-b); }
.s2-banner.is-bad { background: var(--lv-bad); }
.s2-tag { position: absolute; font-family: var(--md-code-font, monospace); font-size: 16px; padding: 4px 10px; border-radius: 8px; white-space: nowrap; }
.s2-tag.is-a { background: var(--lv-a); color: #1a120b; } .s2-tag.is-b { background: var(--lv-b); color: #0b1a1b; }
.s2-tag.is-bad { background: var(--lv-bad); color: #1f0a06; } .s2-tag.is-good { background: var(--lv-good); color: #0c1a0b; }
.s2-check { display: flex; align-items: center; gap: 18px; font-size: 25px; padding: 12px 18px; border-radius: 12px; background: var(--lv-card); border: 1px solid var(--lv-line); }
.s2-check i { width: 34px; height: 34px; border-radius: 8px; border: 2px solid var(--lv-muted); flex: none; display: grid; place-items: center; font-style: normal; color: #0c1a0b; font-weight: 700; font-size: 22px; }
.s2-check.is-done i { background: var(--lv-good); border-color: var(--lv-good); }
.s2-check.is-done { border-color: rgba(140,199,132,.5); }
.s2-svg { position: absolute; overflow: visible; }
.s2-svg text { fill: var(--lv-muted); font-size: 15px; }
.s2-svg .ax { stroke: var(--lv-line); stroke-width: 1.5; }
.s2-svg .grid { stroke: rgba(239,232,220,.07); }
.s2-svg .val { fill: var(--lv-ink); font-size: 17px; }
.s2-svg .big { font-size: 22px; fill: var(--lv-ink); }
.s2-space { background: var(--lv-bad); color: #1f0a06; border-radius: 4px; padding: 0 4px; margin-left: 2px; }
.s2-find { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.s2-find h3 { margin: 0; font: 400 30px/1.1 var(--hz-serif, Georgia, serif); color: var(--lv-ink); }
.s2-find .s2-fig { font-family: var(--md-code-font, monospace); font-size: 21px; color: var(--lv-a); }
.s2-find p { font-size: 19px; color: var(--lv-muted); }
.s2-find p b { color: var(--lv-ink); font-weight: 500; }
`;
  if (!document.querySelector('style[data-hz="video-s2"]')) {
    document.head.append(el("style", { "data-hz": "video-s2", text: CSS }));
  }

  // Shared data (from the notebook outputs)
  const HEAD5 = [
    ["0", "CM-12254", "34", "Metropolitana", "Basic", "25.46"],
    ["1", "CM-10173", "31", "Centro", "Plus", "37.05"],
    ["2", "CM-11339", "38", "Centro", "Prepaid", "11.43"],
    ["3", "CM-13440", "31", "Centro", "Unlimited", "40.97"],
    ["4", "CM-10214", "34", "Metropolitana", "Basic", "19.18"],
  ];
  const HIST = [0, 11, 79, 228, 399, 359, 396, 451, 379, 267, 247, 302, 317, 350, 406, 370, 217, 124, 57, 19, 7]; // bins of 3 USD from 0
  const BOX = [
    ["Prepaid", 4.03, 11.8, 14.28, 17.29, 25.13],
    ["Basic", 11.48, 20.85, 23.9, 27.32, 36.76],
    ["Plus", 23.51, 35.07, 39.03, 43.13, 55.06],
    ["Unlimited", 35.89, 43.79, 46.44, 49.84, 58.7],
  ];
  const PLAN_COL = ["var(--lv-b)", "var(--lv-c)", "var(--lv-a)", "var(--lv-d)"];

  // ---------- small SVG chart helpers ----------
  function vbars(svgNode, { x, y, w, h, values, labels, max, colors, fmt, gap = 0.28 }) {
    const n = values.length;
    const bw = w / n;
    const bars = values.map((v, i) => {
      const r = S("rect", { x: x + i * bw + (bw * gap) / 2, width: bw * (1 - gap), rx: 4, fill: colors ? colors[i % colors.length] : "var(--lv-a)" });
      const t = S("text", { x: x + i * bw + bw / 2, "text-anchor": "middle", class: "val" });
      const l = labels ? S("text", { x: x + i * bw + bw / 2, y: y + h + 24, "text-anchor": "middle", text: labels[i] }) : null;
      svgNode.append(r, t);
      if (l) svgNode.append(l);
      return { r, t, l, v };
    });
    svgNode.append(S("line", { x1: x, x2: x + w, y1: y + h, y2: y + h, class: "ax" }));
    return {
      bars,
      set(p, stagger = 0) {
        bars.forEach((b, i) => {
          const q = k.clamp(p * (1 + stagger * n) - stagger * i, 0, 1);
          const bh = (b.v / max) * h * k.easeOut(q);
          b.r.setAttribute("y", y + h - bh);
          b.r.setAttribute("height", Math.max(0, bh));
          b.t.setAttribute("y", y + h - bh - 8);
          b.t.textContent = fmt ? fmt(b.v) : "";
          b.t.style.opacity = q > 0.9 ? 1 : 0;
          if (b.l) b.l.style.opacity = q > 0 ? 1 : 0;
        });
      },
    };
  }

  function hbars(host, rows, { width = 420, max, color = "var(--lv-a)", fmt = (v) => nf(v) }) {
    const list = rows.map(([label, v]) => {
      const bar = el("div", { class: "s2-hb__bar" });
      const val = el("span", { class: "s2-hb__val", text: fmt(v) });
      const lab = el("span", { class: "s2-hb__lab" });
      if (typeof label === "string") lab.textContent = label;
      else lab.append(label);
      const row = el("div", { class: "s2-hb" }, [lab, el("div", { class: "s2-hb__track" }, [bar, val])]);
      bar.style.background = color;
      host.append(row);
      return { row, bar, val, v, lab };
    });
    return {
      list,
      set(p, stagger = 0.05) {
        list.forEach((r, i) => {
          const q = k.easeOut(k.clamp(p * (1 + stagger * list.length) - stagger * i, 0, 1));
          r.bar.style.width = (r.v / max) * width * q + "px";
          r.val.style.opacity = q > 0.6 ? 1 : 0;
        });
      },
    };
  }
  document.head.append(
    el("style", {
      text: `.s2-hb { display: grid; grid-template-columns: 220px 1fr; align-items: center; gap: 12px; height: 27px; font-size: 17px; }
.s2-hb__lab { font-family: var(--md-code-font, monospace); color: var(--lv-ink); white-space: pre; text-align: right; overflow: hidden; }
.s2-hb__track { display: flex; align-items: center; gap: 10px; }
.s2-hb__bar { height: 18px; border-radius: 4px; }
.s2-hb__val { font-family: var(--md-code-font, monospace); color: var(--lv-muted); font-size: 16px; }
.s2-hb.is-bad .s2-hb__lab { color: var(--lv-bad); }`,
    })
  );

  const scenes = {};

  // ================= PART 1 =================

  scenes.intro = {
    build(node) {
      node.append(
        el("header", { class: "lv-head" }, [
          el("div", { class: "lv-kicker" }, [el("b", { text: "Sesión 2" }), "Análisis de datos con pandas"]),
          el("h2", { class: "lv-title", text: "Limpiar la base de clientes" }),
        ])
      );
      node.querySelector(".lv-title").style.fontSize = "76px";
      const body = el("div", { class: "s2-body" });
      node.append(body);
      const company = k.card([
        el("div", { class: "s2-label" }, [el("b", { text: "Cordillera Mobile" }), " · equipo de analítica"]),
        el("div", { class: "lv-mono", style: "font-size:22px;margin-top:6px", text: "cordillera_mobile.csv" }),
      ]);
      const q1 = k.card([el("div", { class: "s2-team is-a", text: "Equipo comercial" }), el("div", { class: "s2-q", text: "¿Qué explica la cuenta mensual de un cliente?" })]);
      const q2 = k.card([el("div", { class: "s2-team is-b", text: "Equipo de retención" }), el("div", { class: "s2-q", text: "¿Quién está por irse? ¿A quién llamamos?" })]);
      k.abs(company, 0, 0, 520);
      k.abs(q1, 0, 120, 540);
      k.abs(q2, 596, 120, 540);
      const stamp = el("div", { class: "s2-stamp", text: "Datos sucios" });
      k.abs(stamp, 410, 150);
      const dirt = el("div", { class: "s2-row", style: "gap:14px" }, [
        k.pill("1 cliente guardado 2 veces = cuenta doble", "is-bad"),
        k.pill("1 cuenta de US$4.689 arrastra los promedios", "is-bad"),
      ]);
      k.abs(dirt, 0, 300);
      const steps = el("div", { class: "s2-col", style: "gap:22px" }, [
        el("div", { class: "s2-step" }, [el("i", { text: "1" }), "Mirar por dentro un DataFrame"]),
        el("div", { class: "s2-step" }, [el("i", { text: "2" }), "Auditar y limpiar los datos"]),
        el("div", { class: "s2-step" }, [el("i", { text: "3" }), "Encontrar los primeros patrones"]),
      ]);
      k.abs(steps, 0, 10);
      const adv = k.pill("= lo que pide el Avance 2", "is-a");
      adv.style.fontSize = "22px";
      k.abs(adv, 0, 260);
      body.append(company, q1, q2, stamp, dirt, steps, adv);
      return { company, q1, q2, stamp, dirt, steps: [...steps.children], adv };
    },
    update(s, T) {
      const out = fadeOutAfter(T, "plan");
      show(s.company, Math.min(T.p("company"), out));
      show(s.q1, Math.min(T.p("q1"), out));
      show(s.q2, Math.min(T.p("q2"), out));
      pop(s.stamp, Math.min(T.lin("dirty", 0.5), out));
      s.stamp.style.transform += " rotate(-6deg)";
      show(s.dirt, Math.min(T.p("dirty", 0.6, 0.6), out));
      s.steps.forEach((st, i) => show(st, T.p("plan", 0.6, 0.6 + i * 1.6), 0, -30));
      show(s.adv, T.p("plan", 0.6, 6.5));
    },
  };

  scenes.load = {
    build(node) {
      const body = frame(node, "01", "Cargar el archivo", "Una fila por cliente");
      const c = k.code([
        "import pandas as pd",
        'RAW = "https://raw.githubusercontent.com/hizocar/…/cordillera_mobile.csv"',
        "raw = pd.read_csv(RAW)",
        "raw.shape",
      ]);
      c.node.style.width = "1136px";
      const outRow = el("div", { class: "s2-row", style: "gap:60px;margin-top:34px;align-items:flex-end" });
      const rows = el("div", { class: "s2-num", text: "0" });
      const cols = el("div", { class: "s2-num is-b", text: "0" });
      const r1 = el("div", { class: "s2-col", style: "gap:4px" }, [rows, el("div", { class: "s2-label", text: "filas = clientes" })]);
      const r2 = el("div", { class: "s2-col", style: "gap:4px" }, [cols, el("div", { class: "s2-label", text: "columnas = variables" })]);
      const tuple = k.out("(5075, 15)");
      outRow.append(r1, r2, tuple);
      body.append(c.node, outRow);
      return { lines: c.lines, rows, cols, outRow, tuple };
    },
    update(s, T) {
      s.lines.forEach((l, i) => k.typeLine(l, T.lin("code", 1.0, i * 1.4)));
      show(s.outRow, T.p("shape"));
      count(s.rows, 0, 5075, T.lin("shape", 1.4));
      count(s.cols, 0, 15, T.lin("shape", 1.4));
    },
  };

  scenes.anatomy = {
    build(node) {
      const body = frame(node, "02", "Anatomía de un DataFrame", "Filas, columnas y tipos");
      const t = k.table(["", "customer_id", "age", "region", "plan", "monthly_bill"], HEAD5);
      const dt = el("tr", { class: "s2-dtypes" }, ["", "object", "int64", "object", "object", "float64"].map((d) => el("td", { class: "lv-muted", text: d })));
      t.node.querySelector("tbody").append(dt);
      k.abs(t.node, 0, 30);
      const idxTag = el("div", { class: "s2-tag is-a", text: "índice" });
      k.abs(idxTag, 2, -14);
      const colTag = el("div", { class: "s2-tag is-b", text: "columnas = variables" });
      k.abs(colTag, 230, -14);
      const dtTag = el("div", { class: "s2-tag is-a", text: "dtype de cada columna" });
      k.abs(dtTag, 300, 330);
      const ser = k.table(["", "monthly_bill"], HEAD5.map((r) => [r[0], r[5]]), { cls: "s2-series" });
      const serBox = el("div", { class: "s2-col" }, [
        el("div", { class: "lv-mono", style: "font-size:20px", text: 'raw["monthly_bill"]' }),
        ser.node,
        el("div", { class: "lv-mono lv-muted", style: "font-size:15px", text: "Name: monthly_bill, dtype: float64" }),
        k.pill("→ una Series", "is-a"),
      ]);
      k.abs(serBox, 870, 10);
      body.append(t.node, idxTag, colTag, dtTag, serBox);
      return { t, dt, idxTag, colTag, dtTag, serBox, ser };
    },
    update(s, T) {
      show(s.t.node, T.p(0, 0.6));
      const rowsOn = T.on("rows");
      s.t.cells.forEach((r) => k.toggle(r[0], "is-a", rowsOn));
      show(s.idxTag, T.p("rows"));
      const colsOn = T.on("cols");
      s.t.head.slice(1).forEach((h) => k.toggle(h, "is-b", colsOn && !T.on("series")));
      show(s.colTag, T.p("cols") * fadeOutAfter(T, "series"));
      show(s.dt, T.p("dtypes"), 10);
      show(s.dtTag, T.p("dtypes", 0.6, 0.3) * fadeOutAfter(T, "series"));
      const serOn = T.on("series");
      s.t.cells.forEach((r) => k.toggle(r[5], "is-a", serOn));
      k.toggle(s.t.head[5], "is-a", serOn);
      show(s.serBox, T.p("series", 0.8), 0, -60);
    },
  };

  scenes.describe = {
    build(node) {
      const body = frame(node, "02", "Primera mirada", "head(), info() y describe()");
      const chips = ["raw.head()", "raw.info()", "raw.describe()"].map((c) => el("span", { class: "s2-chip", text: c }));
      const chipRow = el("div", { class: "s2-row", style: "gap:14px" }, chips);
      k.abs(chipRow, 0, -6);
      const info = k.table(["columna", "non-null", "dtype"], [
        ["customer_id", "5075", "object"],
        ["age", "5075", "int64"],
        ["region", "5075", "object"],
        ["plan", "5075", "object"],
        ["data_gb", "4874", "float64"],
        ["payment_method", "4921", "object"],
        ["monthly_bill", "5075", "float64"],
      ]);
      info.node.classList.add("is-compact");
      k.abs(info.node, 0, 56);
      const desc = k.table(["", "age", "data_gb", "monthly_bill"], [
        ["count", "5075", "4874", "5075"],
        ["mean", "38.7", "12.8", "33.3"],
        ["min", "-1.0", "0.3", "-36.1"],
        ["25%", "29.0", "4.9", "19.3"],
        ["50%", "38.0", "9.1", "29.0"],
        ["75%", "46.0", "16.5", "41.7"],
        ["max", "999.0", "87.4", "4689.0"],
      ]);
      desc.node.classList.add("is-compact");
      k.abs(desc.node, 600, 56);
      const tip = el("div", { class: "s2-banner", text: "Control de calidad más barato: describe() en cada base nueva" });
      tip.style.bottom = "-40px";
      body.append(chipRow, info.node, desc.node, tip);
      return { chips, info, desc, tip };
    },
    update(s, T) {
      ["head", "info", "describe"].forEach((b, i) => {
        show(s.chips[i], T.p(b, 0.5));
        k.toggle(s.chips[i], "is-on", T.on(b) && (i === 2 || !T.on(["info", "describe"][i])));
      });
      show(s.info.node, T.p("info"));
      s.info.node.style.opacity = T.p("info") * (T.on("describe") ? 0.45 : 1);
      [4, 5].forEach((r) => k.toggle(s.info.cells[r][1], "is-bad", T.on("info", 2.5)));
      show(s.desc.node, T.p("describe"), 0, 30);
      const age = T.on("age");
      k.toggle(s.desc.cells[2][1], "is-bad", age);
      k.toggle(s.desc.cells[6][1], "is-bad", age);
      const bill = T.on("bill");
      k.toggle(s.desc.cells[2][3], "is-bad", bill);
      k.toggle(s.desc.cells[6][3], "is-bad", bill);
      k.toggle(s.desc.cells[5][3], "is-good", T.on("bill", 3.5));
      show(s.tip, T.p("tip"), 20);
    },
  };

  scenes.select = {
    build(node) {
      const body = frame(node, "03", "Seleccionar", "Corchetes, loc e iloc");
      const item = (code, result, cls) => {
        const c = k.code([code]);
        c.node.style.padding = "10px 14px";
        c.node.style.fontSize = "16px";
        const r = k.pill(result, cls);
        return el("div", { class: "s2-row", style: "gap:12px;align-items:center" }, [c.node, r]);
      };
      const items = [
        item('raw["plan"]', "→ Series", "is-a"),
        item('raw[["plan", "monthly_bill"]]', "→ DataFrame", "is-b"),
        item('customers.loc["CM-12254":"CM-11339"]', "etiquetas · incluye el final", "is-a"),
        item("customers.iloc[0:3]", "posiciones · excluye el final", "is-b"),
        item("customers.loc[2]", "KeyError: 2", "is-bad"),
      ];
      const col = el("div", { class: "s2-col", style: "gap:12px" }, items);
      k.abs(col, 0, 0, 640);
      const t = k.table(["pos", "customer_id", "age", "plan"], HEAD5.map((r) => [r[0], r[1], r[2], r[4]]));
      k.abs(t.node, 700, 30);
      const same = k.pill("= las mismas 3 filas", "is-good");
      same.style.fontSize = "20px";
      k.abs(same, 760, 300);
      const ex = el("div", { class: "s2-tag is-b", text: "iloc[0:3]: la posición 3 queda fuera" });
      k.abs(ex, 700, 250);
      body.append(col, t.node, same, ex);
      return { items, t, same, ex };
    },
    update(s, T) {
      show(s.items[0], T.p("cols"));
      show(s.items[1], T.p("cols", 0.6, 2.2));
      s.items[0].style.opacity *= fadeOutAfter(T, "loc") * 0.7 + 0.3;
      s.items[1].style.opacity *= fadeOutAfter(T, "loc") * 0.7 + 0.3;
      show(s.t.node, T.p("two"), 0, 30);
      show(s.items[2], T.p("loc"));
      show(s.items[3], T.p("iloc"));
      show(s.items[4], T.p("err"));
      const loc = T.on("loc"), iloc = T.on("iloc");
      s.t.cells.forEach((r, i) => {
        k.toggle(r[1], "is-a", loc && i < 3);
        k.toggle(r[0], "is-b", iloc && i < 3);
      });
      show(s.ex, T.p("iloc", 0.5, 1.5) * fadeOutAfter(T, "same"));
      show(s.same, T.p("same"));
      if (T.on("err")) s.items[4].firstChild.style.borderColor = "var(--lv-bad)";
    },
  };

  const MROWS = [["12 months", 2], ["Month-to-month", 0], ["Month-to-month", 4], ["24 months", 3], ["Month-to-month", 1], ["12 months", 0], ["Month-to-month", 3], ["24 months", 1]];
  const PYB = (b) => (b ? "True" : "False");
  const MA = MROWS.map(([c]) => c === "Month-to-month");
  const MB = MROWS.map(([, t]) => t >= 3);
  scenes.mask = {
    build(node) {
      const body = frame(node, "04", "Filtrar", "Una máscara de True y False");
      const t = k.table(["contract", "tickets", "A", "B", "A & B"], MROWS.map(([c, n], i) => [c, String(n), PYB(MA[i]), PYB(MB[i]), PYB(MA[i] && MB[i])]));
      t.node.style.fontSize = "17px";
      k.abs(t.node, 0, 0);
      const legend = el("div", { class: "s2-col", style: "gap:10px" }, [
        el("div", { class: "lv-mono", style: "font-size:19px" }, [el("b", { style: "color:var(--lv-a)", text: "A  " }), 'raw["contract"] == "Month-to-month"']),
        el("div", { class: "lv-mono", style: "font-size:19px" }, [el("b", { style: "color:var(--lv-b)", text: "B  " }), 'raw["support_tickets"] >= 3']),
        el("div", { class: "s2-row", style: "gap:10px;margin-top:6px" }, [k.pill("&  y", "is-a"), k.pill("|  o"), k.pill("~  no")]),
      ]);
      k.abs(legend, 610, 0, 526);
      const bad = k.code(['raw[raw["contract"] == "Month-to-month" & raw["support_tickets"] >= 3]']);
      bad.node.style.fontSize = "15px";
      bad.node.style.whiteSpace = "pre-wrap";
      bad.node.style.wordBreak = "break-all";
      const badOut = k.out("TypeError", "is-err");
      const good = k.code(['raw[(raw["contract"] == "Month-to-month") & (raw["support_tickets"] >= 3)]']);
      good.node.style.fontSize = "15px";
      good.node.style.whiteSpace = "pre-wrap";
      good.node.style.wordBreak = "break-all";
      const goodOut = k.out("✓ 151 filas", "is-ok");
      const parens = el("div", { class: "s2-col", style: "gap:6px" }, [bad.node, badOut, good.node, goodOut]);
      k.abs(parens, 610, 168, 526);
      const stats = el("div", { class: "s2-col", style: "gap:8px" }, [
        el("div", { class: "lv-mono", style: "font-size:18px", text: "m2m.mean()  → 0.587  (58,7 %)" }),
        el("div", { class: "s2-row", style: "gap:16px;align-items:flex-end" }, [
          el("div", { class: "s2-num", style: "font-size:72px", text: "68,2 %" }),
          el("div", { class: "s2-label", html: "fuga de los <b>151</b> de la lista<br>vs 16,5 % general" }),
        ]),
      ]);
      k.abs(stats, 610, 168, 526);
      body.append(t.node, legend, parens, stats);
      return { t, legend, parens, bad, good, badOut, goodOut, stats };
    },
    update(s, T) {
      show(s.t.node, T.p(0));
      const col = (c, beat, src) =>
        s.t.cells.forEach((r, i) => {
          const q = T.lin(beat, 0.25, i * 0.18);
          r[c].style.opacity = q;
          k.toggle(r[c], "is-good", src[i] && q > 0);
        });
      [2, 3, 4].forEach((c) => (s.t.head[c].style.opacity = 0));
      s.t.head[2].style.opacity = T.p("maskA");
      s.t.head[3].style.opacity = T.p("maskB");
      s.t.head[4].style.opacity = T.p("and");
      col(2, "maskA", MA);
      col(3, "maskB", MB);
      col(4, "and", MA.map((a, i) => a && MB[i]));
      const f = T.p("filter", 0.8);
      s.t.rows.forEach((r, i) => k.toggle(r, "is-dim", f > 0.5 && !(MA[i] && MB[i])));
      show(s.legend, T.p("maskA"));
      const pOut = fadeOutAfter(T, "trick");
      show(s.parens, T.p("parens") * pOut);
      show(s.badOut, T.p("parens", 0.4, 1.2));
      show(s.good.node, T.p("parens", 0.5, 3.4));
      show(s.goodOut, T.p("parens", 0.4, 4.2));
      show(s.stats, T.p("trick", 0.6, 0.4));
    },
  };

  scenes.isin = {
    build(node) {
      const body = frame(node, "04", "isin y between", "Cuando los datos mienten");
      const help = el("div", { class: "s2-row", style: "gap:16px" }, [
        k.pill('isin(["a", "b"])  ¿está en la lista?', "is-a"),
        k.pill("between(18, 24)  rango, ambos extremos incluidos", "is-b"),
      ]);
      k.abs(help, 0, 0);
      const c1 = k.code(['raw["plan"].isin(["Plus", "Unlimited"]).sum()']);
      const n1 = el("div", { class: "s2-num", style: "font-size:64px", text: "0" });
      const c2 = k.code(['raw["plan"].str.lower().isin(["plus", "unlimited"]).sum()']);
      const n2 = el("div", { class: "s2-num is-b", style: "font-size:64px", text: "0" });
      const r1 = el("div", { class: "s2-row", style: "align-items:center;gap:24px" }, [c1.node, n1]);
      const r2 = el("div", { class: "s2-row", style: "align-items:center;gap:24px" }, [c2.node, n2]);
      k.abs(r1, 0, 80);
      k.abs(r2, 0, 180);
      const chips = el("div", { class: "s2-row", style: "gap:12px;flex-wrap:wrap" }, [
        el("span", { class: "s2-chip is-good", text: "Plus ✓" }),
        el("span", { class: "s2-chip is-good", text: "Unlimited ✓" }),
        el("span", { class: "s2-chip is-bad", text: "PLUS ✗" }),
        el("span", { class: "s2-chip is-bad", text: "unlimited ✗" }),
        el("span", { class: "s2-chip is-bad", text: "UNLIMITED ✗" }),
      ]);
      k.abs(chips, 0, 300);
      const diff = el("div", { class: "s2-note is-bad", text: "123 clientes se escapan del filtro: isin compara el texto exacto" });
      k.abs(diff, 0, 370, 1000);
      body.append(help, r1, r2, chips, diff);
      return { help, r1, r2, n1, n2, chips: [...chips.children], diff };
    },
    update(s, T) {
      show(s.help, T.p(0));
      show(s.r1, T.p("count"));
      count(s.n1, 0, 2186, T.lin("count", 1.2, 0.4));
      show(s.r2, T.p("lower"));
      count(s.n2, 0, 2309, T.lin("lower", 1.2, 0.4));
      s.chips.forEach((c, i) => pop(c, T.lin("why", 0.4, i * 0.35)));
      show(s.diff, T.p("why", 0.6, 2.2));
    },
  };

  scenes.audit = {
    build(node) {
      const body = frame(node, "05", "La auditoría", "Cuatro preguntas, cuatro conteos");
      const lede = el("div", { class: "s2-row", style: "gap:14px;align-items:center;font-size:24px" }, [
        k.pill("pregunta"), el("span", { class: "s2-arrow", text: "→" }), k.pill("código"), el("span", { class: "s2-arrow", text: "→" }), k.pill("conteo", "is-a"),
      ]);
      k.abs(lede, 0, 0);
      const Q = [
        ["1", "¿Hay filas duplicadas?", "raw.duplicated().sum()"],
        ["2", "¿Las categorías están bien escritas?", 'raw["region"].value_counts()'],
        ["3", "¿Hay valores imposibles?", 'raw["age"].between(18, 100)'],
        ["4", "¿Qué falta?", "raw.isna().sum()"],
      ];
      const cards = Q.map(([n, q, c]) =>
        k.card([
          el("div", { class: "s2-step", style: "font-size:25px" }, [el("i", { text: n }), q]),
          el("div", { class: "lv-mono lv-muted", style: "font-size:18px;margin:10px 0 0 68px", text: c }),
        ])
      );
      cards.forEach((c, i) => k.abs(c, (i % 2) * 576, 74 + Math.floor(i / 2) * 136, 560));
      const rule = el("div", { class: "s2-banner is-b", text: "Regla de oro: todo sobre el archivo crudo, antes de cambiar nada" });
      rule.style.bottom = "-18px";
      body.append(lede, ...cards, rule);
      return { lede, cards, rule };
    },
    update(s, T) {
      show(s.lede, T.p("q"));
      s.cards.forEach((c, i) => show(c, T.p("list", 0.6, i * 1.5)));
      show(s.rule, T.p("rule"), 20);
    },
  };

  const REGION_VC = [["Metropolitana", 2149], ["Centro", 991], ["Sur", 975], ["Norte", 723], ["Metropolitana ", 45], ["metropolitana", 43], ["norte", 38], ["METROPOLITANA", 33], ["NORTE", 28], ["sur", 27], ["Sur ", 23]];
  scenes.dupcat = {
    build(node) {
      const body = frame(node, "05", "Chequeos 1 y 2", "Duplicados y categorías");
      const c = k.code(["raw.duplicated().sum()"]);
      const n = el("div", { class: "s2-num is-bad", text: "0" });
      const dupRow = el("div", { class: "s2-row", style: "align-items:center;gap:22px" }, [c.node, n]);
      const pair = k.table(["", "customer_id", "age", "region", "plan"], [["1894", "CM-10277", "45", "Sur", "Prepaid"], ["3098", "CM-10277", "45", "Sur", "Prepaid"]]);
      pair.node.style.fontSize = "16px";
      const left = el("div", { class: "s2-col", style: "gap:14px" }, [dupRow, el("div", { class: "lv-mono lv-muted", style: "font-size:16px", text: "raw[raw.duplicated(keep=False)]" }), pair.node]);
      k.abs(left, 0, 0, 470);
      const right = el("div", { class: "s2-col", style: "gap:4px" });
      const vcTitle = el("div", { class: "lv-mono", style: "font-size:18px;margin-bottom:8px", text: 'raw["region"].value_counts()' });
      right.append(vcTitle);
      const hb = hbars(right, REGION_VC.map(([l, v]) => {
        if (l.endsWith(" ")) return [el("span", {}, [l.trimEnd(), el("span", { class: "s2-space", text: "␣" })]), v];
        return [l, v];
      }), { width: 330, max: 2149 });
      k.abs(right, 520, 0, 616);
      const counter = el("div", { class: "s2-row", style: "gap:12px" }, [k.pill("region: 11 escrituras", "is-bad"), k.pill("plan: 10", "is-bad"), k.pill("reales: 4 y 4", "is-good")]);
      k.abs(counter, 520, 372);
      body.append(left, right, counter);
      return { left, n, pair, right, hb, counter };
    },
    update(s, T) {
      show(s.left, T.p("dup"));
      count(s.n, 0, 75, T.lin("dup", 1.2, 0.5));
      s.left.style.opacity *= 1 - 0.55 * T.p("cat");
      show(s.right, T.p("cat"));
      s.hb.set(T.lin("cat", 1.6, 0.3), 0.06);
      const bad = T.on("eleven");
      s.hb.list.forEach((r, i) => {
        k.toggle(r.row, "is-bad", bad && i >= 4);
        r.bar.style.background = bad && i >= 4 ? "var(--lv-bad)" : "var(--lv-a)";
      });
      show(s.counter, T.p("eleven", 0.6, 0.8));
      s.right.querySelectorAll(".s2-space").forEach((sp) => (sp.style.visibility = T.on("space") ? "" : "hidden"));
    },
  };

  scenes.impmiss = {
    build(node) {
      const body = frame(node, "05", "Chequeos 3 y 4", "Imposibles y faltantes");
      // Age number line
      const ageCard = k.card([], "s2-agecard");
      const svgA = S("svg", { width: 540, height: 120, class: "s2-svg", style: "position:relative" });
      const x = (v) => 40 + (v / 100) * 420;
      svgA.append(
        S("rect", { x: x(18), y: 44, width: x(100) - x(18), height: 14, rx: 7, fill: "rgba(140,199,132,.35)" }),
        S("line", { x1: x(0), x2: x(100), y1: 51, y2: 51, class: "ax" }),
        ...[0, 18, 50, 100].map((v) => S("text", { x: x(v), y: 88, "text-anchor": "middle", text: String(v) })),
        S("text", { x: 505, y: 88, "text-anchor": "middle", text: "999" }),
        S("text", { x: 478, y: 56, "text-anchor": "middle", text: "//" })
      );
      const dots = [
        S("circle", { cx: x(0) - 12, cy: 51, r: 9, fill: "var(--lv-bad)" }),
        S("circle", { cx: x(0), cy: 51, r: 9, fill: "var(--lv-bad)" }),
        S("circle", { cx: 505, cy: 51, r: 9, fill: "var(--lv-bad)" }),
      ];
      svgA.append(...dots, S("text", { x: x(0) - 12, y: 30, "text-anchor": "middle", text: "-1" }));
      ageCard.append(el("div", { class: "s2-label", html: "<b>age</b> debe estar entre 18 y 100" }), svgA, k.pill("15 edades imposibles · 0 ×7 · −1 ×4 · 999 ×4", "is-bad"));
      k.abs(ageCard, 0, 0, 556);
      const billCard = k.card([
        el("div", { class: "s2-label", html: "<b>monthly_bill</b> debe estar entre 0 y 300" }),
        el("div", { class: "s2-row", style: "gap:12px;margin:14px 0" }, [k.pill("10 negativas", "is-bad"), k.pill("5 sobre US$300", "is-bad")]),
      ]);
      const from = el("span", { class: "lv-mono", style: "font-size:34px;color:var(--lv-bad)", text: "4689.00" });
      const to = el("span", { class: "lv-mono", style: "font-size:34px;color:var(--lv-good)", text: "46.89" });
      const dec = el("div", { class: "s2-row", style: "gap:18px;align-items:center" }, [el("span", { class: "s2-label", text: "plan Plus:" }), from, el("span", { class: "s2-arrow", style: "font-size:28px", text: "→" }), to, el("span", { class: "s2-label", text: "¿punto decimal perdido?" })]);
      billCard.append(dec);
      k.abs(billCard, 580, 0, 556);
      const missCard = k.card([el("div", { class: "s2-label", html: "<b>Chequeo 4</b> · valores faltantes  <span class='lv-mono'>raw.isna().sum()</span>" })]);
      const hbHost = el("div", { class: "s2-col", style: "gap:6px;margin-top:12px" });
      missCard.append(hbHost);
      const hb = hbars(hbHost, [["data_gb", 201], ["payment_method", 154]], { width: 640, max: 201, color: "var(--lv-b)" });
      k.abs(missCard, 0, 244, 1136);
      body.append(ageCard, billCard, missCard);
      return { ageCard, dots, billCard, dec, from, to, missCard, hb };
    },
    update(s, T) {
      show(s.ageCard, T.p("age"));
      s.dots.forEach((d, i) => (d.style.opacity = T.lin("age", 0.3, 1 + i * 0.4)));
      show(s.billCard, T.p("bill"));
      show(s.dec, T.p("decimal"));
      const q = T.lin("decimal", 0.6, 2.5);
      s.from.style.textDecoration = q > 0 ? "line-through" : "";
      s.to.style.opacity = q;
      show(s.missCard, T.p("miss"));
      s.hb.set(T.lin("miss", 1.2, 0.3));
    },
  };

  const AUDIT = [["Duplicate rows", 75], ["Non-standard region", 237], ["Non-standard plan", 228], ["Age outside 18-100", 15], ["Missing data_gb", 201], ["Missing payment_method", 154], ["Bill below 0 or above 300", 15]];
  scenes.table = {
    build(node) {
      const body = frame(node, "05", "La tabla de auditoría", "Su evidencia");
      const t = k.table(["problema", "conteo"], AUDIT.map(([a]) => [a, "0"]));
      t.cells.forEach((r) => (r[1].style.textAlign = "right"));
      k.abs(t.node, 0, 0, 560);
      const total = el("div", { class: "s2-col", style: "gap:4px" }, [el("div", { class: "s2-label", text: "valores sucios en total" }), el("div", { class: "s2-num is-bad", style: "font-size:132px", text: "0" })]);
      k.abs(total, 640, 20);
      const ev = el("div", { class: "s2-note", text: "Dice qué está mal antes de tocar nada." });
      k.abs(ev, 640, 220, 480);
      const next = k.card([el("div", { class: "s2-team is-a", text: "Parte 2" }), el("div", { class: "s2-q", text: "Decidir, limpiar y encontrar qué explica la cuenta y la fuga" })]);
      k.abs(next, 640, 300, 496);
      body.append(t.node, total, ev, next);
      return { t, totalN: total.lastChild, total, ev, next };
    },
    update(s, T) {
      show(s.t.node, T.p(0));
      AUDIT.forEach(([, v], i) => count(s.t.cells[i][1], 0, v, T.lin(0, 0.6, 0.3 + i * 0.35)));
      show(s.total, T.p(0, 0.6, 1.2));
      count(s.totalN, 0, 925, T.lin(0, 1.6, 1.2));
      const ev = T.on("evidence");
      s.t.node.style.borderColor = ev ? "var(--lv-a)" : "";
      show(s.ev, T.p("evidence"));
      show(s.next, T.p("next"));
    },
  };

  // ================= PART 2 =================

  const DECISIONS = [
    ["Duplicados exactos", "Eliminar las copias", "Un cliente contado 2 veces pesa doble"],
    ["Escritura inconsistente", "strip() + title()", "Misma región → mismo texto"],
    ["Edad fuera de 18–100", "NaN → mediana", "La edad real no se puede saber"],
    ["data_gb faltante", "Mediana de su plan", "El uso depende del plan"],
    ["payment_method faltante", 'Categoría "Unknown"', "Honesto: no inventamos"],
    ["Cuenta < 0 o > 300", "Eliminar la fila", "Es el objetivo: no se adivina"],
  ];
  scenes.decisions = {
    build(node) {
      const body = frame(node, "06", "Limpiar", "Decisiones que se pueden defender");
      const t = k.table(["problema", "decisión", "por qué"], DECISIONS);
      t.node.style.fontSize = "19px";
      t.node.style.fontFamily = "var(--md-text-font, system-ui)";
      t.cells.forEach((r) => (r[1].style.fontFamily = "var(--md-code-font, monospace)"));
      k.abs(t.node, 0, 0, 1136);
      body.append(t.node);
      return { t };
    },
    update(s, T) {
      show(s.t.node, T.p(0));
      const beats = ["d1", "d2", "d3", "d4", "d5", "d6"];
      let curI = -1;
      beats.forEach((b, i) => {
        const q = T.p(b, 0.5);
        s.t.rows[i].style.opacity = q <= 0 ? 0.08 : 0.08 + 0.92 * q;
        if (T.on(b)) curI = i;
      });
      s.t.cells.forEach((r, i) => k.toggle(r[1], "is-a", i === curI));
    },
  };

  scenes.order = {
    build(node) {
      const body = frame(node, "06", "Orden y registro", "Cada decisión queda anotada");
      const names = ["Duplicados", "Escritura", "Edades", "Faltantes", "Cuentas"];
      const boxes = names.map((n, i) => el("div", { class: "s2-chip", style: "font-size:21px", text: i + 1 + " · " + n }));
      const flow = el("div", { class: "s2-row", style: "gap:10px;align-items:center" });
      boxes.forEach((b, i) => {
        flow.append(b);
        if (i < boxes.length - 1) flow.append(el("span", { class: "s2-arrow", style: "font-size:24px", text: "→" }));
      });
      k.abs(flow, 0, 0);
      const n1 = el("div", { class: "s2-tag is-a", text: "primero: las copias no cuentan doble en las medianas" });
      k.abs(n1, 0, 66);
      const n2 = el("div", { class: "s2-tag is-b", text: "plan bien escrito → mediana por plan" });
      k.abs(n2, 250, 66);
      const c = k.code([
        "log = []",
        "def record(issue, decision, rows):",
        '    log.append({"issue": issue, "decision": decision,',
        '                "rows affected": int(rows)})',
      ]);
      c.node.style.fontSize = "18px";
      k.abs(c.node, 0, 130, 640);
      const t = k.table(["issue", "decision", "rows affected"], [
        ["Exact duplicate rows", "Dropped, kept the first copy", "75"],
        ["Inconsistent spelling in region", "strip() + title()", "236"],
        ["Missing data_gb", "Filled with the plan median", "200"],
      ]);
      t.node.style.fontSize = "14px";
      const tw = el("div", { class: "s2-col", style: "gap:8px" }, [el("div", { class: "lv-mono", style: "font-size:18px", text: "pd.DataFrame(log)" }), t.node, k.pill("= tabla resumen de limpieza del Avance 2", "is-a")]);
      k.abs(tw, 0, 300);
      body.append(flow, n1, n2, c.node, tw);
      return { boxes, n1, n2, c, tw };
    },
    update(s, T) {
      s.boxes.forEach((b, i) => show(b, T.p(0, 0.5, i * 0.25)));
      k.toggle(s.boxes[0], "is-on", T.on("o1") && !T.on("o2"));
      k.toggle(s.boxes[1], "is-on", T.on("o2") && !T.on("log"));
      k.toggle(s.boxes[3], "is-on", T.on("o2") && !T.on("log"));
      show(s.n1, T.p("o1") * fadeOutAfter(T, "o2"));
      show(s.n2, T.p("o2") * fadeOutAfter(T, "log"));
      s.c.lines.forEach((l, i) => k.typeLine(l, T.lin("log", 0.8, i * 0.9)));
      show(s.c.node, T.p("log", 0.3));
      show(s.tw, T.p("table"));
    },
  };

  scenes.steps = {
    build(node) {
      const body = frame(node, "06", "Limpieza paso a paso", "De 5.075 a 4.985 filas");
      const ST = [
        ["s1", "df.drop_duplicates()", "−75 filas"],
        ["s2", '.str.strip().str.title()', "236 + 227 corregidas"],
        ["s3", "fillna(median_age)", "15 edades → 38"],
        ["s4", "df[~bad_bill]", "−15 filas"],
      ];
      const rows = ST.map(([, c, r]) => el("div", { class: "s2-row", style: "align-items:center;gap:14px" }, [el("span", { class: "s2-chip", style: "font-size:19px;min-width:330px", text: c }), el("span", { class: "s2-label", style: "font-size:20px", text: r })]));
      const col = el("div", { class: "s2-col", style: "gap:14px" }, rows);
      k.abs(col, 0, 0, 640);
      const n = el("div", { class: "s2-num", style: "font-size:120px", text: "5.075" });
      const barTrack = el("div", { style: "width:420px;height:22px;border-radius:11px;background:rgba(255,255,255,.08);overflow:hidden" });
      const barFill = el("div", { style: "height:100%;background:var(--lv-a);border-radius:11px" });
      barTrack.append(barFill);
      const right = el("div", { class: "s2-col", style: "gap:10px" }, [el("div", { class: "s2-label", text: "filas" }), n, barTrack]);
      k.abs(right, 700, 0, 436);
      const end = el("div", { class: "s2-col", style: "gap:10px" }, [
        el("div", { class: "s2-row", style: "gap:12px" }, [k.pill("4.985 filas", "is-a"), k.pill("15 columnas"), k.pill("0 faltantes", "is-good")]),
        k.code(["pd.testing.assert_frame_equal(df, published)"]).node,
        k.out("✓ coincide con el archivo limpio publicado", "is-ok"),
      ]);
      k.abs(end, 0, 250, 1136);
      body.append(col, right, end);
      return { rows, n, barFill, end };
    },
    update(s, T) {
      const B = ["s1", "s2", "s3", "s4"];
      s.rows.forEach((r, i) => show(r, T.p(B[i])));
      let v = 5075;
      v -= 75 * T.lin("s1", 0.8, 0.3);
      v -= 15 * T.lin("s4", 0.8, 0.3);
      s.n.textContent = nf(Math.round(v));
      s.barFill.style.width = (100 * (v - 4900)) / (5075 - 4900) * 0.6 + 40 + "%";
      show(s.end, T.p("end"));
    },
  };

  scenes.transform = {
    build(node) {
      const body = frame(node, "06", "Rellenar data_gb", "La mediana de su propio plan");
      const svg = S("svg", { width: 520, height: 330, class: "s2-svg" });
      k.abs(svg, 0, 0);
      const vals = [3.7, 7.1, 14.1, 27.5];
      const vb = vbars(svg, { x: 20, y: 20, w: 480, h: 250, values: vals, labels: ["Prepaid", "Basic", "Plus", "Unlimited"], max: 30, colors: PLAN_COL, fmt: (v) => nf(v, 1) + " GB" });
      const yMed = 20 + 250 - (9.1 / 30) * 250;
      const med = S("g", {}, [S("line", { x1: 20, x2: 500, y1: yMed, y2: yMed, stroke: "var(--lv-ink)", "stroke-dasharray": "6 6", "stroke-width": 2 }), S("text", { x: 24, y: yMed - 10, "text-anchor": "start", class: "val", text: "mediana general 9,1" })]);
      svg.append(med);
      const c = k.code([
        'plan_median = df.groupby("plan")["data_gb"].transform("median")',
        'df["data_gb"] = df["data_gb"].fillna(plan_median)',
      ]);
      c.node.style.fontSize = "14px";
      c.node.style.padding = "14px 16px";
      k.abs(c.node, 560, 0, 576);
      const t = k.table(["plan", "data_gb", "plan_median"], [["Basic", "NaN", "7.1"], ["Plus", "19.0", "14.1"], ["Prepaid", "NaN", "3.7"], ["Unlimited", "NaN", "27.5"]]);
      k.abs(t.node, 560, 120);
      body.append(svg, c.node, t.node);
      return { vb, med, c, t };
    },
    update(s, T) {
      s.vb.set(T.lin("medians", 1.2), 0.15);
      s.med.style.opacity = T.p("medians", 0.6, 3.5);
      show(s.c.node, T.p("code"));
      s.c.lines.forEach((l, i) => k.typeLine(l, T.lin("code", 1.0, i * 1.1)));
      show(s.t.node, T.p("fill"));
      [0, 2, 3].forEach((r) => {
        const done = T.on("fill", 1.2 + r * 0.4);
        s.t.cells[r][1].textContent = done ? s.t.cells[r][2].textContent : "NaN";
        k.toggle(s.t.cells[r][1], "is-good", done);
        k.toggle(s.t.cells[r][1], "is-bad", !done);
      });
    },
  };

  // groupby: dots for customers, coloured by contract, filled when churned.
  const GB_KEYS = ["Month-to-month", "12 months", "24 months"];
  const GB_COL = ["var(--lv-a)", "var(--lv-b)", "var(--lv-c)"];
  const GB_RATE = [22.0, 8.9, 7.8];
  const GB_DOTS = (() => {
    const r = HZ.rng(7);
    const n = [14, 7, 6];
    const churn = [4, 1, 0];
    const out = [];
    n.forEach((cnt, g) => {
      for (let i = 0; i < cnt; i++) out.push({ g, slot: i, churn: i < churn[g] });
    });
    // shuffle for the "mixed" start
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  })();
  scenes.groupby = {
    build(node) {
      const body = frame(node, "07", "groupby", "Separar, aplicar, combinar");
      const c = k.code(['df.groupby("contract")["churned"].mean()']);
      c.node.style.fontSize = "19px";
      k.abs(c.node, 0, -8, 560);
      const svg = S("svg", { width: 640, height: 360, class: "s2-svg" });
      k.abs(svg, 0, 96);
      const dots = GB_DOTS.map((d) => {
        const ci = S("circle", { r: 11, "stroke-width": 3, stroke: GB_COL[d.g], fill: d.churn ? GB_COL[d.g] : "transparent" });
        svg.append(ci);
        return { d, ci };
      });
      const labels = GB_KEYS.map((key, g) => S("text", { x: 90 + g * 200, y: 300, "text-anchor": "middle", class: "val", text: key }));
      const rates = GB_KEYS.map((_, g) => S("text", { x: 90 + g * 200, y: 340, "text-anchor": "middle", class: "big", style: "font-size:28px", text: nf(GB_RATE[g], 1) + " %" }));
      svg.append(...labels, ...rates);
      const leg = el("div", { class: "s2-row", style: "gap:14px" }, [el("span", { class: "s2-label", text: "● se fue (churned = 1)" }), el("span", { class: "s2-label", text: "○ se quedó (0)" }), el("span", { class: "s2-label", text: "· muestra ilustrativa" })]);
      k.abs(leg, 0, 58);
      const steps = ["1 · separar", "2 · aplicar mean()", "3 · combinar"].map((t) => el("span", { class: "s2-chip", text: t }));
      const stepRow = el("div", { class: "s2-col", style: "gap:10px" }, steps);
      k.abs(stepRow, 700, 0, 436);
      const res = k.table(["contract", "churned"], GB_KEYS.map((key, g) => [key, nf(GB_RATE[g] / 100, 3)]));
      k.abs(res.node, 700, 190);
      const note = el("div", { class: "s2-note", text: "0/1 → el promedio es la tasa de fuga" });
      k.abs(note, 700, 350, 436);
      const overall = k.pill("fuga general: 16,4 %", "is-a");
      overall.style.fontSize = "22px";
      k.abs(overall, 700, 404);
      const reg = el("div", { class: "s2-col", style: "gap:6px" }, [el("div", { class: "lv-mono", style: "font-size:17px;margin-bottom:6px", text: 'df.groupby("region")["churned"].mean()' })]);
      const regHb = hbars(reg, [["Norte", 27.6], ["Metropolitana", 15.4], ["Sur", 13.9], ["Centro", 12.4]], { width: 260, max: 27.6, fmt: (v) => pct(v), color: "var(--lv-b)" });
      k.abs(reg, 0, 70, 640);
      body.append(c.node, svg, leg, stepRow, res.node, note, overall, reg);
      return { c, svg, dots, labels, rates, leg, steps, res, note, overall, reg, regHb };
    },
    update(s, T) {
      show(s.c.node, T.p(0));
      const split = T.p("split", 1.2);
      const regionOn = T.p("norte", 0.6);
      s.dots.forEach(({ d, ci }, i) => {
        const x0 = 40 + (i % 9) * 64, y0 = 40 + Math.floor(i / 9) * 64;
        const col = d.slot % 3, row = Math.floor(d.slot / 3);
        const x1 = 30 + d.g * 200 + col * 60, y1 = 30 + row * 46;
        ci.setAttribute("cx", x0 + (x1 - x0) * split);
        ci.setAttribute("cy", y0 + (y1 - y0) * split);
        ci.style.opacity = (T.p(0, 0.6, i * 0.03)) * (1 - regionOn);
      });
      s.labels.forEach((l) => (l.style.opacity = T.p("split", 0.6, 0.8) * (1 - regionOn)));
      s.rates.forEach((r, g) => (r.style.opacity = T.p("apply", 0.5, g * 0.5) * (1 - regionOn)));
      ["split", "apply", "combine"].forEach((b, i) => {
        show(s.steps[i], T.p(b, 0.5));
        k.toggle(s.steps[i], "is-on", T.on(b) && !T.on(["apply", "combine", "rate"][i]));
      });
      show(s.res.node, T.p("combine"));
      show(s.note, T.p("rate"));
      show(s.overall, T.p("result"));
      k.toggle(s.res.cells[0][1], "is-a", T.on("result", 2));
      show(s.leg, T.p("split", 0.5, 0.5) * (1 - regionOn));
      show(s.reg, regionOn);
      s.regHb.set(T.lin("norte", 1.2, 0.3));
      k.toggle(s.regHb.list[0].row, "is-bad", T.on("norte", 1.5));
    },
  };

  scenes.more = {
    build(node) {
      const body = frame(node, "07", "Más patrones", "agg, tickets y la lista de llamadas");
      const agg = k.table(["plan", "count", "mean", "median"], [["Prepaid", "1193", "14.79", "14.28"], ["Basic", "1504", "24.32", "23.90"], ["Plus", "1438", "39.29", "39.03"], ["Unlimited", "850", "46.95", "46.44"]]);
      const aggBox = el("div", { class: "s2-col", style: "gap:8px" }, [el("div", { class: "lv-mono", style: "font-size:16px", text: 'df.groupby("plan")["monthly_bill"].agg(["count", "mean", "median"])' }), agg.node]);
      k.abs(aggBox, 0, 0, 640);
      const svg = S("svg", { width: 480, height: 300, class: "s2-svg" });
      k.abs(svg, 660, 30);
      const rates = [12.8, 13.8, 21.8, 52.4, 42.6, 20.0, 50.0];
      const vb = vbars(svg, { x: 10, y: 30, w: 460, h: 210, values: rates, labels: ["0", "1", "2", "3", "4", "5", "6"], max: 60, colors: ["var(--lv-b)", "var(--lv-b)", "var(--lv-b)", "var(--lv-a)", "var(--lv-a)", "rgba(239,232,220,.25)", "rgba(239,232,220,.25)"], fmt: (v) => nf(v, 0) + "%" });
      svg.append(S("text", { x: 240, y: 296, "text-anchor": "middle", text: "support_tickets → fuga" }));
      const small = el("div", { class: "s2-tag is-bad", text: "n = 5 y n = 2: no confiar" });
      k.abs(small, 900, 4);
      const call = k.card([
        el("div", { class: "lv-mono", style: "font-size:17px", text: '(df["contract"] == "Month-to-month") & (df["support_tickets"] >= 3)' }),
        el("div", { class: "s2-row", style: "gap:30px;align-items:flex-end;margin-top:10px" }, [
          el("div", { class: "s2-col", style: "gap:0" }, [el("div", { class: "s2-num", style: "font-size:76px", text: "147" }), el("div", { class: "s2-label", text: "clientes a llamar" })]),
          el("div", { class: "s2-col", style: "gap:0" }, [el("div", { class: "s2-num is-bad", style: "font-size:76px", text: "68,7 %" }), el("div", { class: "s2-label", text: "se van" })]),
        ]),
      ]);
      k.abs(call, 0, 250, 1136);
      body.append(aggBox, svg, small, call);
      return { aggBox, agg, vb, svg, small, call };
    },
    update(s, T) {
      show(s.aggBox, T.p(0));
      k.toggle(s.agg.cells[0][3], "is-a", T.on("plan"));
      k.toggle(s.agg.cells[3][3], "is-a", T.on("plan"));
      s.svg.style.opacity = T.p("tickets");
      s.vb.set(T.lin("tickets", 1.4, 0.2), 0.08);
      show(s.small, T.p("tickets", 0.5, 4));
      s.aggBox.style.opacity = T.p(0) * (1 - 0.6 * T.p("call"));
      s.svg.style.opacity = T.p("tickets") * (1 - 0.6 * T.p("call"));
      show(s.call, T.p("call"));
    },
  };

  const CHOOSER = [["¿Cómo se reparte un número?", "Histograma"], ["¿Un número entre categorías?", "Boxplot"], ["¿Una tasa por categoría?", "Barras"], ["¿Se mueven juntos dos números?", "Dispersión"]];
  function chooserRow() {
    const cards = CHOOSER.map(([q, c]) => el("div", { class: "s2-chip", style: "flex:1;font-family:var(--md-text-font);font-size:16px" }, [el("div", { class: "lv-muted", text: q }), el("div", { style: "font-size:21px;color:var(--lv-ink);margin-top:4px", text: "→ " + c })]));
    const row = el("div", { class: "s2-row", style: "gap:12px" }, cards);
    k.abs(row, 0, -10, 1136);
    return { row, cards };
  }

  scenes.charts = {
    build(node) {
      const body = frame(node, "08", "Gráficos que responden preguntas", "Primero la pregunta, después el gráfico");
      const ch = chooserRow();
      const svgH = S("svg", { width: 1136, height: 330, class: "s2-svg" });
      k.abs(svgH, 0, 100);
      const max = 451;
      const hb = vbars(svgH, { x: 60, y: 10, w: 640, h: 250, values: HIST, max, colors: ["var(--lv-a)"], gap: 0.08 });
      [0, 15, 30, 45, 60].forEach((v) => svgH.append(S("text", { x: 60 + (v / 63) * 640, y: 290, "text-anchor": "middle", text: "$" + v })));
      svgH.append(S("text", { x: 380, y: 318, "text-anchor": "middle", text: "monthly_bill (USD)" }));
      const humps = [S("text", { x: 60 + (22.5 / 63) * 640, y: 0, "text-anchor": "middle", class: "val", text: "joroba 1" }), S("text", { x: 60 + (43.5 / 63) * 640, y: 26, "text-anchor": "middle", class: "val", text: "joroba 2" })];
      svgH.append(...humps);
      const hNote = el("div", { class: "s2-note", text: "Dos jorobas = dos tipos de clientes mezclados: planes baratos y caros." });
      k.abs(hNote, 760, 140, 376);
      // Boxplot
      const svgB = S("svg", { width: 1136, height: 330, class: "s2-svg" });
      k.abs(svgB, 0, 100);
      const y = (v) => 270 - (v / 65) * 250;
      const boxes = BOX.map(([name, lo, q1, med, q3, hi], i) => {
        const cx = 120 + i * 170;
        const g = S("g", {}, [
          S("line", { x1: cx, x2: cx, y1: y(hi), y2: y(lo), stroke: PLAN_COL[i], "stroke-width": 2 }),
          S("rect", { x: cx - 45, y: y(q3), width: 90, height: y(q1) - y(q3), rx: 6, fill: "rgba(0,0,0,.35)", stroke: PLAN_COL[i], "stroke-width": 2.5 }),
          S("line", { x1: cx - 45, x2: cx + 45, y1: y(med), y2: y(med), stroke: "var(--lv-ink)", "stroke-width": 3 }),
          S("text", { x: cx + 54, y: y(med) + 5, class: "val", text: nf(med, 2) }),
          S("text", { x: cx, y: 300, "text-anchor": "middle", text: name }),
        ]);
        svgB.append(g);
        return g;
      });
      svgB.append(S("line", { x1: 50, x2: 760, y1: 270, y2: 270, class: "ax" }));
      [0, 20, 40, 60].forEach((v) => svgB.append(S("text", { x: 40, y: y(v) + 5, "text-anchor": "end", text: "$" + v })));
      const bNote = el("div", { class: "s2-note", text: "El plan fija el nivel de la cuenta: las cajas vecinas casi no se tocan." });
      k.abs(bNote, 800, 140, 336);
      body.append(ch.row, svgH, hNote, svgB, bNote);
      return { ch, svgH, hb, humps, hNote, svgB, boxes, bNote };
    },
    update(s, T) {
      s.ch.cards.forEach((c, i) => {
        show(c, T.p(0, 0.5, 0.5 + i * 0.4));
        k.toggle(c, "is-on", (i === 0 && T.on("hist") && !T.on("box")) || (i === 1 && T.on("box")));
      });
      const hOut = 1 - T.p("box", 0.5);
      s.svgH.style.opacity = T.p("hist") * hOut;
      s.hb.set(T.lin("hist", 1.6, 0.2), 0.02);
      s.humps.forEach((h, i) => (h.style.opacity = T.p("hist", 0.5, 4 + i * 2.5)));
      show(s.hNote, T.p("hist", 0.6, 5) * hOut);
      s.svgB.style.opacity = T.p("box");
      s.boxes.forEach((b, i) => (b.style.opacity = T.p("box", 0.5, 0.3 + i * 0.4)));
      show(s.bNote, T.p("box", 0.6, 2.5));
    },
  };

  scenes.charts2 = {
    build(node, kit) {
      const body = frame(node, "08", "Gráficos que responden preguntas", "Barras y dispersión");
      const ch = chooserRow();
      const svgBar = S("svg", { width: 440, height: 330, class: "s2-svg" });
      k.abs(svgBar, 0, 100);
      const vb = vbars(svgBar, { x: 20, y: 30, w: 400, h: 220, values: [22.0, 8.9, 7.8], labels: ["Month-to-month", "12 months", "24 months"], max: 25, colors: ["var(--lv-a)", "var(--lv-b)", "var(--lv-c)"], fmt: (v) => nf(v, 1) + " %" });
      svgBar.append(S("text", { x: 220, y: 316, "text-anchor": "middle", text: "tasa de fuga por contrato" }));
      const svgSc = S("svg", { width: 640, height: 330, class: "s2-svg" });
      k.abs(svgSc, 496, 100);
      const sx = (v) => 50 + (Math.min(v, 60) / 60) * 560;
      const sy = (v) => 260 - (v / 65) * 250;
      svgSc.append(S("line", { x1: 50, x2: 610, y1: 260, y2: 260, class: "ax" }), S("line", { x1: 50, x2: 50, y1: 10, y2: 260, class: "ax" }));
      svgSc.append(S("text", { x: 330, y: 296, "text-anchor": "middle", text: "data_gb →" }), S("text", { x: 40, y: 18, "text-anchor": "end", text: "$" }));
      const pts = (S2_SCATTER || []).map(([x, yv, p], i) => {
        const c = S("circle", { cx: sx(x), cy: sy(yv), r: 4.2, fill: PLAN_COL[p], "fill-opacity": 0.75 });
        svgSc.append(c);
        return c;
      });
      const r = S("text", { x: 600, y: 40, "text-anchor": "end", class: "big", style: "font-size:30px;fill:var(--lv-a)", text: "r = 0,75" });
      svgSc.append(r);
      const leg = el("div", { class: "s2-row", style: "gap:14px" }, ["Prepaid", "Basic", "Plus", "Unlimited"].map((p, i) => el("span", { class: "s2-label" }, [el("b", { style: `color:${PLAN_COL[i]}`, text: "● " }), p])));
      k.abs(leg, 560, 96);
      const rule = el("div", { class: "s2-banner", text: "Cada gráfico: título · ejes con nombre · una frase que diga qué muestra" });
      rule.style.bottom = "-18px";
      body.append(ch.row, svgBar, svgSc, leg, rule);
      return { ch, svgBar, vb, svgSc, pts, r, leg, rule };
    },
    update(s, T) {
      s.ch.cards.forEach((c, i) => {
        show(c, 1);
        k.toggle(c, "is-on", (i === 2 && T.on("bar") && !T.on("scatter")) || (i === 3 && T.on("scatter")));
      });
      s.svgBar.style.opacity = T.p("bar");
      s.vb.set(T.lin("bar", 1.2, 0.3), 0.15);
      s.svgSc.style.opacity = T.p("scatter");
      s.pts.forEach((p, i) => (p.style.opacity = T.lin("scatter", 0.3, 0.3 + (i % 40) * 0.04)));
      s.r.style.opacity = T.p("scatter", 0.5, 4);
      show(s.leg, T.p("scatter", 0.5, 1));
      show(s.rule, T.p("rule"), 20);
    },
  };

  scenes.findings = {
    build(node) {
      const body = frame(node, "09", "De gráficos a hallazgos", "Un número, más lo que significa");
      const tpl = el("div", { class: "s2-row", style: "gap:12px;align-items:center;font-size:20px" }, [k.pill("Qué vemos"), el("span", { class: "s2-arrow", text: "→" }), k.pill("Qué significa para el negocio", "is-a"), el("span", { class: "s2-arrow", text: "→" }), k.pill("Qué mirar después", "is-b")]);
      k.abs(tpl, 0, -6);
      const F = [
        ["Los contratos retienen", "22,0 % vs 7,8 %", "Probar un descuento por pasarse a contrato.", "¿Se mantiene en cada plan?"],
        ["Reclamos antes de las bajas", "Norte 27,6 % · 147 a 68,7 %", "Llamar primero a esos 147 clientes.", "¿De qué tratan los tickets del norte?"],
        ["El plan fija la cuenta", "US$14 → US$46 · r = 0,75", "Explicar una cuenta: plan + gigas.", "¿Cuánto suma cada GB? Sesión 3."],
      ];
      const cards = F.map(([h, fig, mean, next], i) =>
        k.card([el("div", { class: "s2-find" }, [el("div", { class: "s2-team is-a", text: "Hallazgo " + (i + 1) }), el("h3", { text: h }), el("div", { class: "s2-fig", text: fig }), el("p", { html: "<b>" + mean + "</b>" }), el("p", { text: "→ " + next })])])
      );
      cards.forEach((c, i) => k.abs(c, i * 386, 70, 364));
      const caution = el("div", { class: "s2-banner is-bad", text: "Ojo: esto no prueba causalidad. Los hallazgos indican dónde mirar." });
      caution.style.bottom = "-18px";
      body.append(tpl, ...cards, caution);
      return { tpl, cards, caution };
    },
    update(s, T) {
      show(s.tpl, T.p(0, 0.6, 1));
      ["f1", "f2", "f3"].forEach((b, i) => show(s.cards[i], T.p(b)));
      show(s.caution, T.p("caution"), 20);
    },
  };

  scenes.advance = {
    build(node) {
      const body = frame(node, "10", "Tu proyecto esta semana", "Avance 2 · limpieza y análisis exploratorio");
      const due = el("div", { class: "s2-row", style: "gap:12px" }, [k.pill("vence: martes 10 de noviembre, 23:59", "is-bad"), k.pill("Caso A · TalentCo → Salary", "is-a"), k.pill("Caso B · FinTrust → default", "is-b")]);
      k.abs(due, 0, -6);
      const items = [
        "Auditoría primero, con su resultado en el notebook",
        "Una decisión justificada por problema (record + log)",
        "Tabla resumen · groupby al objetivo · 4 gráficos con su frase",
        "3 hallazgos con significado de negocio",
        "Restart session and run all antes de entregar",
      ];
      const checks = items.map((t) => el("div", { class: "s2-check" }, [el("i", { text: "✓" }), t]));
      const col = el("div", { class: "s2-col", style: "gap:10px" }, checks);
      k.abs(col, 0, 60, 1000);
      const bye = el("div", { class: "lv-title", style: "position:absolute;right:0;bottom:-10px;font-size:40px;color:var(--lv-a)", text: "¡Nos vemos en la Sesión 3!" });
      body.append(due, col, bye);
      return { due, checks, bye };
    },
    update(s, T) {
      show(s.due, T.p(0, 0.6, 0.5));
      ["c1", "c2", "c3", "c4", "c5"].forEach((b, i) => {
        show(s.checks[i], T.p(b, 0.5));
        k.toggle(s.checks[i], "is-done", T.on(b, 1.2));
        s.checks[i].querySelector("i").style.color = T.on(b, 1.2) ? "" : "transparent";
      });
      show(s.bye, T.p("c5", 0.6, 3));
    },
  };

  // 260 customers sampled from the clean file: [data_gb, monthly_bill, plan index]
  var S2_SCATTER = [[10.3, 27.0, 2], [15.3, 53.6, 2], [41.3, 46.3, 3], [14.0, 43.5, 2], [13.5, 58.0, 3], [46.4, 46.2, 3], [26.4, 35.0, 1], [56.6, 57.6, 3], [14.5, 37.1, 2], [3.2, 7.1, 0], [14.1, 38.7, 2], [7.4, 30.9, 1], [15.2, 32.1, 2], [2.9, 24.7, 1], [5.9, 43.9, 2], [2.4, 11.6, 0], [23.8, 46.2, 2], [7.5, 23.8, 0], [15.1, 38.7, 2], [13.5, 33.6, 1], [9.5, 22.3, 1], [23.7, 45.7, 2], [4.4, 24.9, 2], [2.0, 16.1, 0], [1.9, 15.6, 0], [3.9, 19.2, 1], [5.7, 22.5, 1], [5.1, 29.9, 1], [3.6, 21.9, 1], [45.6, 44.4, 3], [49.1, 46.4, 3], [15.3, 26.6, 1], [8.5, 15.0, 0], [7.9, 13.2, 0], [27.5, 43.6, 3], [9.4, 30.5, 1], [13.5, 46.9, 2], [4.4, 20.8, 1], [15.5, 23.8, 1], [11.9, 41.9, 3], [4.4, 22.5, 1], [7.9, 39.0, 2], [15.5, 23.0, 1], [12.6, 21.4, 1], [3.7, 10.7, 0], [46.4, 56.9, 2], [18.0, 48.9, 2], [2.7, 15.5, 0], [11.7, 29.2, 2], [11.6, 42.0, 2], [5.3, 24.8, 1], [4.0, 16.2, 0], [15.9, 44.3, 3], [15.9, 38.9, 3], [34.3, 46.9, 3], [10.9, 33.6, 2], [4.2, 14.2, 0], [3.4, 13.5, 1], [4.6, 36.2, 2], [14.6, 39.8, 2], [5.4, 44.6, 2], [14.7, 35.4, 2], [1.3, 11.3, 0], [27.4, 43.5, 3], [7.1, 30.7, 1], [6.4, 30.9, 1], [23.4, 49.2, 2], [14.7, 35.4, 2], [33.7, 48.0, 2], [7.4, 25.1, 1], [16.9, 41.9, 3], [7.4, 22.8, 1], [14.1, 43.0, 2], [4.2, 11.9, 0], [6.5, 21.4, 1], [7.1, 20.7, 1], [6.1, 21.7, 0], [10.4, 32.8, 2], [4.2, 16.1, 0], [33.0, 47.5, 3], [6.9, 19.3, 1], [13.5, 27.5, 1], [24.4, 38.6, 2], [14.1, 41.5, 2], [6.4, 29.2, 1], [3.3, 14.9, 0], [17.9, 35.1, 2], [8.2, 30.5, 2], [32.7, 50.4, 2], [3.9, 13.2, 0], [5.5, 41.3, 2], [6.5, 19.3, 0], [15.6, 48.6, 3], [9.4, 20.0, 1], [6.7, 22.7, 1], [23.0, 49.2, 3], [6.7, 18.4, 0], [21.5, 43.9, 2], [6.3, 29.1, 1], [9.9, 25.7, 1], [4.4, 18.2, 0], [24.9, 45.4, 3], [69.4, 49.6, 3], [8.0, 30.4, 2], [26.6, 49.2, 3], [6.4, 8.0, 0], [23.3, 41.9, 3], [9.9, 42.3, 3], [1.6, 16.3, 0], [24.6, 44.6, 3], [20.3, 50.4, 3], [3.7, 11.9, 0], [15.5, 41.6, 2], [7.6, 25.2, 1], [7.5, 14.8, 0], [2.3, 16.7, 0], [5.0, 17.1, 0], [6.0, 12.6, 0], [3.1, 13.9, 0], [6.4, 35.4, 1], [22.3, 38.9, 2], [10.1, 24.4, 1], [4.1, 24.3, 0], [12.7, 31.8, 1], [22.0, 41.4, 3], [14.1, 37.0, 2], [7.4, 19.4, 1], [40.0, 52.5, 3], [16.4, 34.6, 2], [3.6, 10.7, 0], [2.8, 17.9, 0], [15.0, 50.3, 2], [8.9, 46.8, 3], [14.7, 43.8, 2], [18.6, 30.7, 2], [6.7, 25.2, 1], [27.3, 47.4, 2], [8.5, 24.4, 1], [4.3, 12.3, 0], [9.1, 27.1, 1], [6.4, 22.7, 1], [4.1, 21.6, 1], [10.2, 36.3, 2], [16.7, 26.8, 1], [2.1, 11.3, 0], [30.3, 43.5, 3], [13.1, 48.4, 3], [4.6, 17.5, 0], [5.0, 13.4, 0], [50.6, 56.8, 3], [4.4, 20.5, 1], [7.4, 30.7, 1], [30.0, 45.6, 3], [10.8, 47.6, 3], [11.5, 32.3, 2], [24.2, 46.2, 3], [13.3, 23.7, 1], [26.8, 41.8, 2], [23.0, 42.4, 2], [25.6, 50.8, 3], [3.2, 27.0, 1], [4.1, 27.7, 1], [2.9, 22.9, 0], [39.5, 51.9, 2], [8.7, 19.1, 1], [4.7, 20.1, 1], [14.6, 43.1, 3], [8.9, 38.3, 3], [9.6, 20.6, 1], [8.9, 40.1, 3], [20.4, 44.3, 2], [18.3, 44.2, 3], [2.5, 28.4, 0], [63.6, 57.2, 3], [16.2, 36.0, 3], [10.7, 45.4, 3], [10.3, 36.2, 2], [1.3, 14.0, 0], [9.4, 23.7, 1], [5.0, 12.6, 0], [38.0, 52.1, 3], [8.1, 38.4, 2], [24.5, 49.6, 3], [15.7, 38.2, 2], [4.1, 30.8, 2], [45.9, 51.5, 3], [5.4, 17.3, 1], [12.1, 44.2, 2], [3.7, 16.1, 0], [20.0, 49.1, 2], [3.6, 25.6, 1], [3.9, 11.6, 0], [6.9, 31.6, 2], [0.8, 6.3, 0], [6.2, 12.1, 0], [34.4, 61.1, 3], [2.1, 10.7, 0], [33.2, 44.9, 3], [10.7, 33.4, 2], [8.5, 44.0, 3], [3.1, 17.9, 1], [21.5, 47.3, 3], [2.4, 8.2, 0], [3.7, 36.0, 2], [21.5, 38.6, 2], [2.0, 21.6, 1], [2.7, 13.4, 0], [33.5, 43.4, 3], [3.3, 17.1, 0], [19.8, 45.1, 2], [22.4, 45.9, 3], [17.7, 27.9, 1], [8.0, 26.7, 1], [1.8, 13.1, 1], [39.7, 47.9, 3], [40.4, 53.5, 3], [13.8, 33.1, 1], [12.2, 38.8, 2], [8.5, 37.2, 2], [7.6, 44.1, 2], [3.7, 8.7, 0], [7.4, 35.9, 2], [10.1, 18.6, 1], [44.7, 50.2, 3], [3.8, 9.1, 0], [5.4, 19.2, 0], [14.1, 45.7, 2], [2.1, 20.2, 1], [18.2, 28.3, 1], [9.3, 18.5, 1], [30.8, 42.8, 2], [33.8, 44.9, 3], [8.6, 38.0, 2], [2.7, 22.7, 0], [9.4, 24.8, 0], [7.5, 39.4, 2], [5.3, 13.6, 0], [3.3, 11.8, 0], [22.8, 41.6, 2], [4.4, 27.5, 1], [4.0, 28.7, 2], [15.4, 42.1, 3], [7.1, 19.8, 1], [43.8, 55.1, 3], [17.8, 47.3, 2], [37.3, 43.7, 3], [12.5, 28.8, 1], [2.5, 22.2, 1], [14.4, 37.1, 2], [16.7, 42.1, 2], [2.9, 13.2, 0], [25.3, 57.9, 3], [3.4, 11.6, 0], [6.5, 20.6, 0], [8.4, 32.9, 2], [14.1, 42.6, 2], [27.2, 47.6, 2], [13.7, 26.4, 1], [8.9, 16.3, 0], [4.1, 23.1, 1]];

  HZ.video.scenes("s2", scenes);
})();
