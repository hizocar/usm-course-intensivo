/*
 * Team mailbox forms (docs/project/mailbox.md). Submissions go to a Google
 * Apps Script web app that writes them to the course spreadsheet; the script
 * is in tools/mailbox/Code.gs.
 */
(function () {
  // Paste the web app's /exec URL here after deploying tools/mailbox/Code.gs.
  const ENDPOINT = "";

  let teams = null;

  function enhance() {
    document.querySelectorAll("form.hz-mb:not([data-ready])").forEach((form) => {
      form.dataset.ready = "1";
      form.addEventListener("change", () => conditional(form));
      conditional(form);
      if (!ENDPOINT) {
        form.querySelector("[type=submit]").disabled = true;
        say(form, "The mailbox is not open yet.", "");
        return;
      }
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        submit(form);
      });
      if (form.dataset.kind === "advance") loadTeams(form);
    });
  }

  // <label data-show-if="case=C · Own case"> only appears for that choice.
  function conditional(form) {
    form.querySelectorAll("[data-show-if]").forEach((node) => {
      const [name, value] = node.dataset.showIf.split("=");
      const on = new FormData(form).get(name) === value;
      node.hidden = !on;
      node.querySelectorAll("input, textarea").forEach((i) => (i.required = on));
    });
    if (form.dataset.kind === "advance") fillTeams(form);
  }

  async function loadTeams(form) {
    try {
      const res = await fetch(ENDPOINT + "?teams=1");
      teams = (await res.json()).teams || [];
      fillTeams(form);
    } catch (e) {
      teams = null; // the datalist is a convenience; typing still works
    }
  }

  function fillTeams(form) {
    if (!teams) return;
    const section = new FormData(form).get("section");
    const list = form.querySelector("datalist");
    list.replaceChildren(
      ...teams
        .filter((t) => !section || t.section === section)
        .map((t) => Object.assign(document.createElement("option"), { value: t.team }))
    );
  }

  function payload(form) {
    const f = new FormData(form);
    const get = (k) => (f.get(k) || "").toString().trim();
    const data = { kind: form.dataset.kind, website: get("website") };
    for (const k of ["section", "team", "case", "proposal", "advance", "colab", "note"]) data[k] = get(k);
    if (data.kind === "team") {
      data.members = [1, 2, 3].map((i) => ({ name: get("name" + i), email: get("email" + i) })).filter((m) => m.name || m.email);
    }
    return data;
  }

  function check(form, data) {
    for (const input of form.querySelectorAll("[required]")) {
      if (!input.checkValidity()) {
        input.focus();
        return "Complete the highlighted field" + (input.type === "email" ? " with a valid email." : ".");
      }
    }
    if (data.kind === "team" && data.members.some((m) => !m.name || !m.email)) return "Every member needs both a name and an email.";
    if (data.colab && !/^https:\/\/(colab\.research\.google\.com|drive\.google\.com)\//.test(data.colab)) {
      return "Use the notebook's Colab link (Share › Copy link). It starts with https://colab.research.google.com/";
    }
    return "";
  }

  async function submit(form) {
    const data = payload(form);
    form.classList.add("was-validated");
    const problem = check(form, data);
    if (problem) return say(form, problem, "bad");

    const btn = form.querySelector("[type=submit]");
    btn.disabled = true;
    say(form, "Sending…", "");
    try {
      // text/plain keeps this a "simple" request, which Apps Script accepts cross-origin.
      const res = await fetch(ENDPOINT, { method: "POST", body: JSON.stringify(data) });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || "The mailbox rejected the submission.");
      say(form, "✓ " + out.message + " A confirmation email is on its way.", out.onTime === false ? "warn" : "good");
      form.classList.remove("was-validated");
      if (data.kind === "advance") {
        form.querySelector("[name=note]").value = "";
      } else {
        form.reset();
        teams = null;
      }
    } catch (err) {
      say(form, "Not sent: " + err.message + " Try again, or email hizocar@gmail.com if it keeps failing.", "bad");
    } finally {
      btn.disabled = false;
    }
  }

  function say(form, text, tone) {
    const p = form.querySelector(".hz-mb-result");
    p.textContent = text;
    p.dataset.tone = tone;
  }

  if (typeof document$ !== "undefined") document$.subscribe(enhance);
  else document.addEventListener("DOMContentLoaded", enhance);
})();
