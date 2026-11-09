# Grades

Grades of the weekly advances, on USM's 0–100 scale (55 is a pass). Press **Reveal** on your team to see its grade and point-by-point feedback against the checklist on the [weekly progress](progress.md) page, with advice for the next advance. If your team is missing or something looks wrong, write to hizocar@gmail.com.

## Advance 1 · Team, data, and question

*Due Tuesday, November 3, 23:59. The checklist has five items: team registered, notebook shared, data loaded from its URL, first inspection, and business question with its user.*

### Casa Central

<div class="hz-teams">
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Cuando pagan</span><span class="hz-team-meta">Case A · TalentCo · submitted 11 hours late</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>85</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared with the instructor; the first cell names the team, members, and case.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> Shape, types, first rows, missing values (8 of 9 columns), and 97 duplicates, plus <code>describe()</code> and the list of labels in every text column. Your “Qué observamos” cell already spots the inconsistent labels (PhD/Phd/PHD, FINANCE/Finance, extra spaces) and the impossible values (Age 119, Years_Experience 78, Performance_Score 99).</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> Specific and useful: what determines salary, to detect gaps without objective justification, for HR and the compensation team, with <code>Salary</code> as the target.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>The work deserves 100; the grade is 85 because it arrived one day late (−15). Mind Tuesday's deadline for Advance 2.</li><li>Your list of problems is the starting point of Advance 2: turn each one into a line of the cleaning log (problem · decision · rows affected).</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Los Alemanes</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>93</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Notebook in Colab, shared.</strong> Shared, but the notebook is called <em>Untitled1.ipynb</em>. Give it your team's name, and delete the empty cell at the end.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> Read from the course URL through a <code>DATA_URL</code> variable: good practice.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> Shape, types, missing values, duplicates, and first rows in one tidy cell, with a written summary (10,100 rows, 97 duplicates, 8 of 9 columns with gaps, Performance_Score the worst with 603).</span></li><li><span class="hz-mark">⚠️</span><span><strong>Business question and its user.</strong> It is clear and names its user, but it repeats the brief almost word for word. Make it yours: which decision will the people team take with the answer, and which gaps matter most to them (department, region, gender?).</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Add to your summary what the inspection already shows: inconsistent labels (<code>bachelor</code> vs <code>Bachelor</code>, <code>FINANCE</code>, <code>" West"</code>) and impossible values (Age up to 119, Years_Experience −10 to 78, Performance_Score up to 99). Those are the problems you fix in Advance 2.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">búsqueda inusual</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>93</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared, with the team and members at the top.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL.</span></li><li><span class="hz-mark">⚠️</span><span><strong>First inspection.</strong> All five checks are there (shape, types, missing values, 97 duplicates, first rows), but there is no written reading of what they show.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> Clear and focused: the effect of experience, education, and performance on salary, for TalentCo's HR management to design competitive pay and retain talent.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Add a short “What we see” cell after the inspection: 97 duplicate rows, missing values in 8 of 9 columns, and labels written in several ways (<code>bachelor</code>/<code>Bachelor</code>, <code>FINANCE</code>/<code>Finance</code>). Numbers plus one sentence on why each matters.</li><li>Run <code>df.describe()</code> too: it reveals impossible values (Age 119, Performance_Score 99) that you will need to fix in Advance 2.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Ana y Cléo</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>90</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared with the instructor.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL.</span></li><li><span class="hz-mark">⚠️</span><span><strong>First inspection.</strong> Every check is there (shape, types, <code>info()</code>, first rows, missing values, 97 duplicates), but the cells were run out of order: the cells that import pandas and load the data have no run recorded. Use <em>Runtime › Restart session and run all</em> before submitting. The text cell copies the checklist instead of saying what you found.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> Good angle: which factors drive salary and whether there is discrimination in pay, for HR to detect and fix it.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Replace the copied checklist line with your own observations: how many duplicates, which columns have gaps, which labels are inconsistent.</li><li>Write the notebook in one language (it mixes English and Spanish); either is fine.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Grupito</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>63</strong> 🟡</p>
<ul class="hz-checks"><li><span class="hz-mark">⚠️</span><span><strong>Registered in the mailbox.</strong> Registered, but the advance was submitted in the mailbox as <em>Advance 2</em>. Choose the right advance when you submit.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared with the instructor.</span></li><li><span class="hz-mark">❌</span><span><strong>Data loaded from its URL.</strong> The notebook loads <code>cordillera_mobile.csv</code>, the dataset of the classes, instead of your case's <code>employee_compensation.csv</code>.</span></li><li><span class="hz-mark">⚠️</span><span><strong>First inspection.</strong> The five checks are done (5,075 rows, 75 duplicates…), but they describe the wrong data, so none of the findings apply to TalentCo.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> Well written: the main factors behind salaries and how much each explains, for HR and TalentCo's management to review compensation policies.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Change the URL to <code>https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/employee_compensation.csv</code> and run everything again before starting Advance 2: the cleaning has to be done on your case's data.</li><li>Add one sentence per check saying what it shows.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Ignachelo</span><span class="hz-team-meta">Case B · FinTrust Bank · registered on November 8, after the deadline</span></div>
<div class="hz-team-note">Advance 1 pending: write to hizocar@gmail.com to agree how your team catches up.</div>
</div>
</div>

### Vitacura

<div class="hz-teams">
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">FinTrust Bank Vicente Célia</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered (as “Vincente”: use one spelling of the team name everywhere).</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared, with a clear title, the case, and the members.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>loan_default.csv</code> read from the course URL.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> Shape (10,060 × 16), types, first rows, missing values per column, and 60 duplicates, each followed by a written analysis. You went further: <code>interest_rate</code> is stored as text and 803 rows (7.98%) carry a “%” sign.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> In your own words, with its users (the risk department and the credit analysts) and <code>default</code> as the target.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>For Advance 2, also look for inconsistent labels (<code>full_time</code> vs <code>Full Time</code>, <code>Auto</code>/<code>car</code>) and impossible values (credit scores outside 300–850).</li><li>Before submitting, run <em>Restart session and run all</em>: several cells have no run recorded.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Mafilia</span><span class="hz-team-meta">Case A · TalentCo · not submitted</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>0</strong> ⚫</p>
<ul class="hz-checks"><li><span class="hz-mark">❌</span><span><strong>Advance 1.</strong> Nothing was received in the mailbox, and the three-day late window closed on Friday, November 6.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Advance 2 is due Tuesday, November 10, and it builds on Advance 1: load your case's data from its URL and run the first inspection before you start cleaning. If something is blocking your team, write to hizocar@gmail.com today.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">PJMC</span><span class="hz-team-meta">Case B · FinTrust Bank · not submitted</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>0</strong> ⚫</p>
<ul class="hz-checks"><li><span class="hz-mark">❌</span><span><strong>Advance 1.</strong> Nothing was received in the mailbox, and the three-day late window closed on Friday, November 6.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Advance 2 is due Tuesday, November 10, and it builds on Advance 1: load your case's data from its URL and run the first inspection before you start cleaning. If something is blocking your team, write to hizocar@gmail.com today.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">The Boys</span><span class="hz-team-meta">Case B · FinTrust Bank · not submitted</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>0</strong> ⚫</p>
<ul class="hz-checks"><li><span class="hz-mark">❌</span><span><strong>Advance 1.</strong> Nothing was received in the mailbox, and the three-day late window closed on Friday, November 6.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Advance 2 is due Tuesday, November 10, and it builds on Advance 1: load your case's data from its URL and run the first inspection before you start cleaning. If something is blocking your team, write to hizocar@gmail.com today.</li></ul>
</div>
</div>
</div>

| Grade | | Meaning |
|:--:|:--:|---|
| 85 – 100 | 🟢 | Every item is done and correct. |
| 55 – 84 | 🟡 | Every item is there, but some need fixing before the next advance. |
| 1 – 54 | 🔴 | Important items are missing. |
| 0 | ⚫ | Not submitted. |

Late submissions lose 15 points per day for up to three days; after that the advance gets a 0.
