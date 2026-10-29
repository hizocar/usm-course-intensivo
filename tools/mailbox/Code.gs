/**
 * Team mailbox for the ML Intensive course.
 *
 * Receives the two forms on https://hizocar.github.io/usm-course-intensivo/project/mailbox/
 * and writes them to the spreadsheet this script is bound to:
 *   - "Teams":    team registrations
 *   - "Advances": weekly advance submissions, stamped on time / late
 *
 * Setup (once): open the spreadsheet › Extensions › Apps Script, paste this file,
 * then Deploy › New deployment › Web app, Execute as "Me", Who has access "Anyone".
 * Copy the /exec URL into ENDPOINT at the top of docs/javascripts/mailbox.js.
 */

// Send a confirmation email to every registered member on each submission.
// Gmail accounts can send about 100 of these a day.
const SEND_RECEIPTS = true;
const INSTRUCTOR = "hizocar@gmail.com";

// End of the due day in Chile (UTC-3 in November).
const DEADLINES = {
  "Advance 1": "2026-11-03T23:59:59-03:00",
  "Advance 2": "2026-11-10T23:59:59-03:00",
  "Advance 3": "2026-11-17T23:59:59-03:00",
  "Advance 4": "2026-11-24T23:59:59-03:00",
  "Final project": "2026-12-01T23:59:59-03:00",
};

const SECTIONS = ["Casa Central (Wednesday)", "Vitacura (Friday)"];
const CASES = ["A · TalentCo", "B · FinTrust Bank", "C · Own case"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.website) return json({ ok: true }); // honeypot field: bots fill it, people don't see it
    if (data.kind === "team") return json(registerTeam(data));
    if (data.kind === "advance") return json(submitAdvance(data));
    return json({ ok: false, error: "Unknown form." });
  } catch (err) {
    return json({ ok: false, error: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

// GET ?teams=1 lists registered team names per section, for the advance form.
function doGet(e) {
  if (e && e.parameter && e.parameter.teams) {
    const rows = sheet("Teams").getDataRange().getValues().slice(1);
    const seen = {};
    rows.forEach((r) => (seen[r[1] + "|" + r[2]] = { section: r[1], team: r[2] }));
    return json({ ok: true, teams: Object.values(seen) });
  }
  return json({ ok: true, service: "ML Intensive mailbox" });
}

function registerTeam(d) {
  const section = oneOf(d.section, SECTIONS, "section");
  const team = text(d.team, "team name", 60);
  const kase = oneOf(d.case, CASES, "case");
  const proposal = kase.startsWith("C") ? text(d.proposal, "own case proposal", 1500) : "";
  const members = (d.members || [])
    .map((m) => ({ name: clean(m.name, 80), email: clean(m.email, 120).toLowerCase() }))
    .filter((m) => m.name || m.email);
  if (members.length < 2 || members.length > 3) throw new Error("Teams have 2 or 3 members.");
  members.forEach((m) => {
    if (!m.name) throw new Error("Every member needs a name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.email)) throw new Error("Check the email of " + m.name + ".");
  });
  const colab = d.colab ? colabLink(d.colab) : "";

  const flat = [];
  for (let i = 0; i < 3; i++) flat.push(members[i] ? members[i].name : "", members[i] ? members[i].email : "");
  addRow("Teams", [new Date(), section, team, kase, proposal].concat(flat, [colab]));

  receipt(
    members.map((m) => m.email),
    "[ML Intensive] Team registered: " + team,
    "Your team is registered.\n\nTeam: " + team + "\nSection: " + section + "\nCase: " + kase +
      "\nMembers:\n" + members.map((m) => "  - " + m.name + " <" + m.email + ">").join("\n") +
      "\n\nIf something is wrong, submit the form again: the latest registration counts."
  );
  return { ok: true, message: "Team “" + team + "” registered with " + members.length + " members." };
}

function submitAdvance(d) {
  const section = oneOf(d.section, SECTIONS, "section");
  const team = text(d.team, "team name", 60);
  const advance = oneOf(d.advance, Object.keys(DEADLINES), "advance");
  const colab = colabLink(d.colab);
  const note = clean(d.note, 1000);

  const now = new Date();
  const deadline = new Date(DEADLINES[advance]);
  const onTime = now <= deadline;
  const lateBy = onTime ? "" : " (" + Math.ceil((now - deadline) / 36e5) + " h late)";
  addRow("Advances", [now, section, team, advance, colab, note, deadline, onTime ? "Yes" : "No" + lateBy]);

  receipt(
    membersOf(section, team),
    "[ML Intensive] " + advance + " received: " + team,
    advance + " received for team " + team + " (" + section + ").\n\nReceived: " + now.toString() +
      "\nDeadline: " + deadline.toString() + "\nOn time: " + (onTime ? "yes" : "no" + lateBy) +
      "\nNotebook: " + colab + "\n\nThe notebook is reviewed as it is at the deadline, so keep it shared with " + INSTRUCTOR + "."
  );
  return {
    ok: true,
    onTime,
    message: advance + " received for “" + team + "”" + (onTime ? ", on time." : ", after the deadline" + lateBy + "."),
  };
}

// ---------- helpers ----------

function sheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

// Writes after the last row that has a timestamp in column A, and only in the
// columns given. appendRow would count cells an ARRAYFORMULA fills (like the
// "Days late" column in Advances) as used, and could write at the bottom of
// the sheet instead.
function addRow(name, values) {
  const sh = sheet(name);
  const colA = sh.getRange(1, 1, sh.getMaxRows(), 1).getValues();
  let last = colA.length;
  while (last > 1 && colA[last - 1][0] === "") last--;
  if (last + 1 > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), 100);
  sh.getRange(last + 1, 1, 1, values.length).setValues([values]);
}

function membersOf(section, team) {
  const key = team.trim().toLowerCase();
  const rows = sheet("Teams").getDataRange().getValues().slice(1);
  const match = rows.filter((r) => r[1] === section && String(r[2]).trim().toLowerCase() === key).pop();
  return match ? [match[6], match[8], match[10]].filter(Boolean) : [];
}

function receipt(to, subject, body) {
  if (!SEND_RECEIPTS || !to.length) return;
  try {
    MailApp.sendEmail({ to: to.join(","), subject, body, replyTo: INSTRUCTOR, name: "ML Intensive mailbox" });
  } catch (err) {
    console.warn("Receipt not sent: " + err); // quota reached; the row is already saved
  }
}

function clean(v, max) {
  return String(v == null ? "" : v).replace(/^[=+\-@]+/, "").trim().slice(0, max); // no spreadsheet formulas
}

function text(v, label, max) {
  const s = clean(v, max);
  if (!s) throw new Error("Missing " + label + ".");
  return s;
}

function oneOf(v, options, label) {
  if (options.indexOf(v) < 0) throw new Error("Choose a valid " + label + ".");
  return v;
}

function colabLink(v) {
  const s = clean(v, 300);
  if (!/^https:\/\/(colab\.research\.google\.com|drive\.google\.com)\//.test(s)) {
    throw new Error("The notebook link must be a Colab or Google Drive link (https://colab.research.google.com/...).");
  }
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
