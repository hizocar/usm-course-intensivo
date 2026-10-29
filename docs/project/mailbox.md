# Team mailbox

Everything you hand in during the course goes through this page. Every submission gets a timestamp, and each team member receives a confirmation email.

<div class="hz-mb-steps" markdown>

<div markdown>
<span class="hz-step">01</span>
**Register your team** once, by the end of session 1. One member registers for the whole team.
</div>

<div markdown>
<span class="hz-step">02</span>
**Submit each weekly advance** before **Tuesday at 23:59**. The schedule is on the [weekly progress](progress.md) page.
</div>

</div>

## 1. Register your team

<form class="hz-mb" data-kind="team" novalidate>
  <fieldset>
    <legend>Section</legend>
    <label class="hz-mb-choice"><input type="radio" name="section" value="Casa Central (Wednesday)" required> Casa Central · Wednesdays</label>
    <label class="hz-mb-choice"><input type="radio" name="section" value="Vitacura (Friday)"> Vitacura · Fridays</label>
  </fieldset>

  <label class="hz-mb-field">Team name
    <input name="team" maxlength="60" required autocomplete="off" placeholder="e.g. Los Outliers">
  </label>

  <fieldset>
    <legend>Case</legend>
    <label class="hz-mb-choice"><input type="radio" name="case" value="A · TalentCo" required> A · TalentCo (regression)</label>
    <label class="hz-mb-choice"><input type="radio" name="case" value="B · FinTrust Bank"> B · FinTrust Bank (classification)</label>
    <label class="hz-mb-choice"><input type="radio" name="case" value="C · Own case"> C · Your own case</label>
  </fieldset>

  <label class="hz-mb-field" data-show-if="case=C · Own case">Own case proposal
    <textarea name="proposal" rows="4" maxlength="1500" placeholder="Business question, public URL of the data, number of rows, and target variable."></textarea>
  </label>

  <fieldset class="hz-mb-members">
    <legend>Members <small>(2 or 3, from the same section)</small></legend>
    <div class="hz-mb-member"><input name="name1" placeholder="Full name" required autocomplete="off" aria-label="Member 1 name"><input name="email1" type="email" placeholder="Email" required autocomplete="off" aria-label="Member 1 email"></div>
    <div class="hz-mb-member"><input name="name2" placeholder="Full name" required autocomplete="off" aria-label="Member 2 name"><input name="email2" type="email" placeholder="Email" required autocomplete="off" aria-label="Member 2 email"></div>
    <div class="hz-mb-member"><input name="name3" placeholder="Full name (optional)" autocomplete="off" aria-label="Member 3 name"><input name="email3" type="email" placeholder="Email (optional)" autocomplete="off" aria-label="Member 3 email"></div>
  </fieldset>

  <label class="hz-mb-field">Project notebook in Colab <small>(optional now, required for Advance 1)</small>
    <input name="colab" type="url" placeholder="https://colab.research.google.com/drive/...">
  </label>

  <input class="hz-mb-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button type="submit" class="hz-run-btn hz-run-btn--primary">Register team</button>
  <p class="hz-mb-result" role="status"></p>
</form>

!!! tip "Made a mistake?"
    Send the form again with the same team name. The most recent registration is the one that counts.

## 2. Submit a weekly advance

<form class="hz-mb" data-kind="advance" novalidate>
  <fieldset>
    <legend>Section</legend>
    <label class="hz-mb-choice"><input type="radio" name="section" value="Casa Central (Wednesday)" required> Casa Central · Wednesdays</label>
    <label class="hz-mb-choice"><input type="radio" name="section" value="Vitacura (Friday)"> Vitacura · Fridays</label>
  </fieldset>

  <label class="hz-mb-field">Team name <small>(exactly as you registered it)</small>
    <input name="team" maxlength="60" required autocomplete="off" list="hz-mb-teams">
    <datalist id="hz-mb-teams"></datalist>
  </label>

  <label class="hz-mb-field">Advance
    <select name="advance" required>
      <option value="">Choose…</option>
      <option>Advance 1</option>
      <option>Advance 2</option>
      <option>Advance 3</option>
      <option>Advance 4</option>
      <option>Final project</option>
    </select>
  </label>

  <label class="hz-mb-field">Link to the project notebook in Colab
    <input name="colab" type="url" required placeholder="https://colab.research.google.com/drive/...">
  </label>

  <label class="hz-mb-field">Note for the instructor <small>(optional)</small>
    <textarea name="note" rows="3" maxlength="1000" placeholder="Anything we should know: blockers, questions, which sections changed."></textarea>
  </label>

  <input class="hz-mb-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button type="submit" class="hz-run-btn hz-run-btn--primary">Submit advance</button>
  <p class="hz-mb-result" role="status"></p>
</form>

!!! info "What gets graded"
    The notebook is reviewed **as it is at the deadline** (Colab keeps the version history). Keep it shared with **hizocar@gmail.com** as Commenter. For the final project you also email the slides, as described in the [project brief](project.md#submission).
