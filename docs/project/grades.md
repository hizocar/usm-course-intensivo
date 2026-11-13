# Grades

Grades of the weekly advances, on USM's 0–100 scale (55 is a pass). Press **Reveal** on your team to see its grade and point-by-point feedback against the checklist on the [weekly progress](progress.md) page, with advice for the next advance. If your team is missing or something looks wrong, write to hizocar@gmail.com.

## Advance 2 · Cleaning and exploratory analysis

*Due Tuesday, November 10, 23:59. The checklist has six items: duplicates and missing values, inconsistent categories, impossible values, cleaning summary table, exploratory charts, and three findings.*

### Casa Central

<div class="hz-teams">
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Cuando pagan</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>95</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 97 duplicates removed, plus 3 more that only appear once the spelling is unified. Rows without salary are dropped; age and experience are filled with the median of their job level, and missing categories become <code>Unknown</code>.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> A list of valid labels per column and a lowercase map to them, so <code>'nan'</code> written as text turns into a real missing value. You printed the result to check.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Impossible values.</strong> Good ranges for age, experience, and performance. But the extreme salaries are kept and only flagged: 5,342 USD for a Senior or 394,249 for a Junior are not real salaries (no salary falls between 20,000 and 40,000 or between 180,000 and 200,000). Because they stay, the experience–salary correlation drops to 0.63, while without them it is 0.83, and chart 1 shows a long tail that is really errors.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> From the <code>record()</code> log, with a note that explains why the counts differ from the audit (200 vs 203).</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Six charts, five of them against <code>Salary</code>, each with a sentence that has numbers. The gender comparison within each job level is the right way to look at it.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Quantified, with what they mean for HR and what to check next, and all their numbers come from a single cell so the text and the code cannot disagree.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Decide what to do with the extreme salaries before Advance 3: in a regression, a few values of 5,000 or 390,000 USD pull the line and inflate RMSE. If you keep them, show the model with and without them.</li><li>The Advance 2 notebook arrived on time this week: well done.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Los Alemanes</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>95</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 97 duplicates removed; rows with missing or impossible salary dropped because salary is the target; age and experience filled with the median of the job level (1, 7, and 15 years), performance with the overall median because it barely changes by level.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> <code>strip()</code> and <code>title()</code>, then <code>PhD</code> and <code>HR</code> restored and the text <code>" nan"</code> turned into a real missing value.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Impossible values.</strong> Experience and performance ranges are right, and the salary cut is justified with a histogram. But the age range 18–100 still keeps 7 ages between 90 and 99, while real ages stop at 47. Look at where the real values end, as you did for salary.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Built from the log, plus a written table with the reason for each decision.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Four charts against salary, each with a “What it shows” sentence that has numbers.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Quantified (Engineering earns about 21,600 USD more than HR), with what they mean for the people team and a clear warning that they show connections, not causes.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>You gave the notebook your team's name: good. Add a first cell with the team and members, and number the sections in order (there is no section 2).</li><li>Your finding 2 asks to compare employees of the same level in both departments: do it in Advance 3 with a <code>pivot_table</code> by department and job level.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">búsqueda inusual</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>65</strong> 🟡</p>
<ul class="hz-checks"><li><span class="hz-mark">⚠️</span><span><strong>Duplicates and missing values.</strong> The 97 duplicates are gone and rows without <code>Salary</code> are dropped, which is right for the target. But the filter <code>df[(df['Age'] &lt; 100) &amp; (df['Performance_Score'] &lt; 99) &amp; …]</code> also drops every row where <code>Age</code> or <code>Performance_Score</code> is empty, because a comparison with <code>NaN</code> is always <code>False</code>. That is why it removed 892 rows: almost all of them were missing values, not impossible ones, and they were lost without a decision.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Inconsistent categories.</strong> <code>Education_Level</code> and <code>Department</code> are unified, but <code>title()</code> turns <code>HR</code> into <code>Hr</code> and <code>PhD</code> into <code>Phd</code>. <code>Region</code>, <code>Gender</code>, and <code>Job_Level</code> still have extra spaces (<code>" South"</code>, <code>"Male "</code>, <code>"Senior "</code>) and a <code>" nan"</code> written as text.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Impossible values.</strong> Ages of 119 and a score of 99 are removed, but ages from 1 to 17 and scores of −1, 0, 6, and 7.5 stay: the score scale is 1 to 5. Define a valid range for each column (for example <code>between(18, 70)</code> and <code>between(1, 5)</code>).</span></li><li><span class="hz-mark">❌</span><span><strong>Cleaning summary table.</strong> There is no table with issue, decision, and rows affected.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Four charts on salary, each with a sentence. The box plot by <code>Performance_Score</code> has one box per decimal value and is hard to read: group the scores into bands or use a scatter plot.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Three findings.</strong> Each one has a business meaning, but none has a number (how much more does a PhD earn? what is the correlation with experience?), and “higher degrees ensure higher pay” states a cause that a chart cannot prove.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Your mailbox note mentions a <code>describe()</code> cell and the inspection conclusions, but they are not in the shared notebook. Check that you saved them.</li><li>Rebuild the cleaning one step per cell, with a <code>log</code> of every decision, and turn it into the summary table (as in the Session 2 notebook). Then rerun the charts on the corrected data.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Ana y Cléo</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>65</strong> 🟡</p>
<ul class="hz-checks"><li><span class="hz-mark">⚠️</span><span><strong>Duplicates and missing values.</strong> The 97 duplicates are removed and the median choice is well justified. But <code>Salary</code> is the target: filling 203 salaries with the median invents the answer the model has to learn. Drop those rows instead.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Inconsistent categories.</strong> <code>strip().lower().title()</code> unifies the spellings, but it ran after filling the gaps, so the text <code>" nan"</code> became a <code>Nan</code> category in <code>Region</code> and <code>Gender</code> (your own <code>unique()</code> output shows it). Clean the spelling first, turn <code>"nan"</code> into a real missing value, then fill.</span></li><li><span class="hz-mark">❌</span><span><strong>Impossible values.</strong> The ranges are well reasoned, but the cell that applies them ends in <code>NameError: name 'numeric_cols' is not defined</code>, so the fix never reached the data. The rule <code>Years_Experience &lt; 1</code> would also erase every junior with 0 years, which is a valid value.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Cleaning summary table.</strong> It has the right columns, but the counts are wrong: it shows 2 duplicates instead of 97 (it counts after removing them), 1,168 “negative values” (there are 15), and “Standardized” instead of a number.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Five charts on salary (distribution, education, department, region, job level, gender), each with a sentence, and now everything is in one language.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Three findings.</strong> They are about gender, department, and region, but not about the strongest pattern in your own charts: job level. They have no numbers, and “no discrimination” is a stronger claim than a box plot can support.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>The cells were run out of order again (some at 18:17, others at 23:07, one with an error). Before submitting, use <em>Runtime › Restart session and run all</em> and check that no cell fails.</li><li>Rewrite the findings with numbers: “a Senior earns X% more than a Junior”, and compare departments within the same job level.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Grupito</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 97 duplicates removed; rows without salary dropped because filling the target “would give the model false answers”; experience filled with the median of its job level; missing categories become <code>Unknown</code>.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> <code>strip()</code> and <code>title()</code>, then <code>HR</code> and <code>PhD</code> restored, and the text <code>" nan"</code> turned into a real missing value. You printed the final categories to check.</span></li><li><span class="hz-mark">✅</span><span><strong>Impossible values.</strong> A range for each column, and the salary range chosen from the gaps in the data (nobody earns between 18,000 and 43,000). Impossible values become missing and are filled, so no employee is lost for one bad value.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Built from the <code>registrar()</code> log: 20 rows, and the before/after counts (10,100 → 9,657 rows, 3,227 → 0 missing values).</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Six charts, each with a “Qué muestra” sentence that has numbers (a Senior earns about 73% more than a Junior).</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Clear, with numbers and a business meaning, and a note that they show associations, not causes. Finding 2 (performance is barely paid) is a sharp insight.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>You moved to your case's data after Advance 1: well done.</li><li>Department and education may differ partly because of job level. Compare them within the same level (<code>pivot_table</code> by department and job level) before drawing conclusions.</li><li>Age and experience are strongly related (0.80). Keep that in mind when you interpret the regression coefficients in Advance 3.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">JC &amp; PF</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 97 duplicates removed; rows without salary dropped; age and experience filled with the median of their job level, after checking that it really changes by level.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> A map to the official labels per column, the text <code>'nan'</code> turned into a missing value, and a final check of every column's labels.</span></li><li><span class="hz-mark">✅</span><span><strong>Impossible values.</strong> A table of valid ranges with the reason for each, and the salary cut justified with the empty bands (no salary between 20,000 and 40,000 or between 180,000 and 200,000) and with salaries that do not match the job level.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Written decisions with their justification, plus the table built from the log (10,100 → 9,657 rows, no missing values left).</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Seven charts, almost all comparing within the same job level, each with a “Qué muestra” sentence. You checked that departments have the same mix of levels before blaming the gap on them.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Quantified and well argued: the ~20,000 USD department gap within the same level is exactly the inconsistency TalentCo suspected.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Excellent work. For Advance 3, your findings already say which variables the model should weigh most: check whether the coefficients agree.</li><li>Advance 1 and 2 now live in one notebook: keep using it until the final submission.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Ignachelo</span><span class="hz-team-meta">Case B · FinTrust Bank · not submitted yet</span></div>
<div class="hz-team-note">Nothing received in the mailbox. The three-day late window closes on Friday, November 13, at 23:59 (−15 points per day late).</div>
</div>
</div>

### Vitacura

<div class="hz-teams">
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">FinTrust Bank Vicente Célia</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 60 duplicates removed; income filled with the median of each employment type, the rest with the overall median, and no rows dropped. You checked that loans with a missing <code>credit_score</code> default at the same rate (27.9% vs 28.3%) before filling them: an excellent check.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> <code>employment_type</code> goes from 19 spellings to 4 categories and <code>loan_purpose</code> from 21 to 6, with the typos fixed (<code>Eduaction</code>, <code>educat</code>, <code>Bussiness</code>) and an <code>assert</code> that every spelling was recognized.</span></li><li><span class="hz-mark">✅</span><span><strong>Impossible values.</strong> A table of valid ranges with the reason for each, including the filler incomes (5,555,555, 8,888,888, and 9,999,999) that most teams missed.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Built from the <code>record()</code> log, with assertions that check the clean data.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> A <code>groupby</code> on <code>default</code> first, then five charts, each titled with the question it answers and followed by a sentence.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Each with what we see, what it means for the bank, and what to look at next. You also said which variables do not matter (region, term, purpose), which is a finding too.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Keep the 28.3% default rate in mind: it is the key to the baseline you have to explain in Advance 3.</li><li>Pick one language for the notebook (titles and code comments are in English, the text in Spanish), and use <em>Restart session and run all</em> before submitting.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">Mafilia</span><span class="hz-team-meta">Case A · TalentCo · submitted 3 hours late</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>85</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> You saw that <code>dropna()</code> lost 29% of the data and changed it: now only duplicates and rows with a missing or impossible salary are dropped, and everything else is filled, each decision with its reason (9,657 rows kept).</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> <code>strip()</code> and <code>title()</code>, with fixes for <code>HR</code>, <code>PhD</code>, and the text <code>"nan "</code>.</span></li><li><span class="hz-mark">✅</span><span><strong>Impossible values.</strong> Ranges based on where the real values stop (ages 21 to 47 against 1–9 and 90–119).</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> From the log, with a justification column.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Four charts whose titles state the answer. The one comparing departments within the same job level is the best chart of the week.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Strong and quantified: Engineering pays about 20,000 USD more than HR at the same level, with what it means and what to check next.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>The work deserves 100; the grade is 85 because it arrived 3 hours late (−15).</li><li>Your Advance 1 was in this notebook on November 3, but it never reached the mailbox. Always submit through the mailbox, even if the work is not perfect.</li><li>Remove the “[cite: 1]” marks left in the text cells.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">PJMC</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>85</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 60 duplicates removed; missing values filled with the median, with the reason written in the log.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> Every spelling of <code>employment_type</code> and <code>loan_purpose</code> is mapped to its category, typos included (<code>eduaction</code>, <code>bussiness</code>).</span></li><li><span class="hz-mark">⚠️</span><span><strong>Impossible values.</strong> Good ranges, plus a check that experience is consistent with age. But <code>annual_income</code> has no upper limit, so the filler codes 9,999,999, 8,888,888, and 5,555,555 stay as real incomes and pull the averages up.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Issue, decision, rows affected, and justification for every step.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Four charts, each with a printed interpretation, three of them against <code>default</code>.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Three findings.</strong> Each has a business meaning, but two rest on very small differences (3.4 points by purpose, 1.6 by region). Your data has much stronger signals: late payments, credit score, and collateral.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Advances 1 and 2 are in a single code cell with no text cells (−5). Split them: one step per cell, with a heading and a sentence in a text cell after each result.</li><li>Remove the attempt to read <code>loan_default_clean.csv</code>: that file does not exist (404).</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">The Boys</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>70</strong> 🟡</p>
<ul class="hz-checks"><li><span class="hz-mark">⚠️</span><span><strong>Duplicates and missing values.</strong> 60 duplicates removed and good ideas (indicator columns such as <code>credit_score_was_missing</code>). But the table says <code>credit_score</code> was filled with the median, while the code sets those 537 loans aside in <code>df_sin_historial</code>, so the analysis runs on 9,463 loans. Choose one and make the table match the code.</span></li><li><span class="hz-mark">❌</span><span><strong>Inconsistent categories.</strong> <code>capitalize()</code> is not enough: <code>Full_time</code>, <code>Full-time</code>, <code>Fulltime</code>, and <code>Full time</code> are still four different labels (your own preview shows two of them), and the same happens with part time and self-employed. In <code>loan_purpose</code> only <code>car</code>/<code>auto</code> was merged; <code>Eduaction</code>, <code>Educat</code>, and <code>Bussiness</code> remain. Run <code>value_counts()</code> after cleaning to check.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Impossible values.</strong> Age, credit score, and negative late payments are fixed. Negative <code>years_employed</code> (30 rows, down to −10) and the filler incomes (9,999,999) are still there.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Issue, decision, and rows affected for nine problems. Add the rows for the impossible values.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Four charts before and after cleaning, all against <code>default</code>, with one sentence each.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Three findings.</strong> Clear recommendations, but some claims have no support in the notebook: a “near-zero default rate” for the safe profile, and the rule by loan purpose (there is no table or chart of purpose against default). The text also contradicts itself: chart 3 says the rise is “almost linear”, and the conclusion calls it “exponential”.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>To unify the spellings: <code>.str.strip().str.lower().str.replace(r"[\s_-]", "", regex=True)</code> turns every variant into <code>fulltime</code>, <code>parttime</code>…; then a dictionary maps each one to its final name.</li><li>Every number in a finding should come from a cell in the notebook. If you have not measured it, write it as a hypothesis to check.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">zipzip</span><span class="hz-team-meta">Case A · TalentCo · submitted on time</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Duplicates and missing values.</strong> 97 duplicates removed, plus a second pass that found 3 duplicates hidden by spelling (<code>HR</code> vs <code>hr</code>): a sharp detail. Rows without salary are dropped and age and experience are filled with the median of their job level.</span></li><li><span class="hz-mark">✅</span><span><strong>Inconsistent categories.</strong> <code>strip()</code>, lowercase, and a map to the official category, with an <code>assert</code> that nothing unexpected is left. You explained why you did not use <code>title()</code>.</span></li><li><span class="hz-mark">✅</span><span><strong>Impossible values.</strong> Ranges for age, experience, and performance, and a salary range justified with a count by bands.</span></li><li><span class="hz-mark">✅</span><span><strong>Cleaning summary table.</strong> Built from the log, with a check that the deleted rows add up.</span></li><li><span class="hz-mark">✅</span><span><strong>Exploratory charts.</strong> Five charts, each one answering a question, with a consistent color for each job level. You checked that the job-level mix is similar across departments before comparing them.</span></li><li><span class="hz-mark">✅</span><span><strong>Three findings.</strong> Quantified, with what they mean for the business and what to look at next.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Remove the checklists pasted from the course page (“extraído de la clase”): the notebook is a report for TalentCo, not a to-do list.</li><li>The team has a single member, and the project asks for 2 or 3. If you need help finding a partner, write to hizocar@gmail.com.</li></ul>
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
<div class="hz-team-head"><span class="hz-team-name">JC &amp; PF</span><span class="hz-team-meta">Case A · TalentCo · submitted after the deadline, accepted without penalty</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared, with the case, members, and section in the first cell, and a heading for every step.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL through a <code>DATA_URL</code> variable.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> Shape, types, first rows, missing values with their percentage, and 97 duplicates, plus <code>describe()</code> and the list of labels per text column. Your “Qué vemos” cell already names the inconsistent labels, the <code>'nan'</code> written as text, and the impossible values (Age 1 to 119, Performance_Score −1 to 99).</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> What explains <code>Salary</code> and which gaps are unjustified, for HR and the compensation team to adjust salary bands, with the target and the type of problem (regression) named.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>The cells have no run recorded in Colab. Before submitting, use <em>Runtime › Restart session and run all</em> in Colab itself.</li><li>Submit each advance through the mailbox by its deadline: this one arrived a week late.</li></ul>
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
<div class="hz-team-head"><span class="hz-team-name">Mafilia</span><span class="hz-team-meta">Case A · TalentCo · not sent to the mailbox; graded from the notebook, without penalty</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>90</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Notebook in Colab, shared.</strong> Shared, with a clear title and the case, but without the team name and members.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL.</span></li><li><span class="hz-mark">⚠️</span><span><strong>First inspection.</strong> Shape, types (<code>info()</code>), first rows, and 97 duplicates are there, and a short data dictionary too. But missing values appear only as one total (3,227) instead of per column, and the notebook goes straight into cleaning without saying what the inspection shows.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> Which variables explain salary and which gaps the company should fix, for TalentCo's people team.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>This work was ready on November 3 but never reached the mailbox. Submit every advance through the mailbox, even if it is not perfect.</li><li>Your Advance 2 already fixed the cleaning of this first version (no more <code>dropna()</code>): good progress.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">PJMC</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted by email after the deadline, accepted without penalty</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>85</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Notebook in Colab, shared.</strong> Shared, but there is no title cell with the team, members, and case, and Advance 1 and Advance 2 live in one single cell. Give each step its own cells, with a text heading.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>loan_default.csv</code> read from the course URL.</span></li><li><span class="hz-mark">⚠️</span><span><strong>First inspection.</strong> Shape (10,060 × 16), types, first rows, missing values with their percentage, and 60 duplicates, shown side by side: good. But there is no written reading of what they show.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> What defaulters have in common and how to spot them in advance, for collections and recovery, to reduce losses. Write it in a text cell, not as a code comment.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Add a short “What we see” cell after the inspection: 60 duplicates, <code>credit_score</code> with the most gaps (501), <code>interest_rate</code> stored as text, and labels written in several ways (<code>full_time</code>/<code>Full Time</code>, <code>Auto</code>/<code>car</code>).</li><li>Your notebook tries to read a <code>loan_default_clean.csv</code> that does not exist (404). Work only from the raw file and your own cleaning.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">The Boys</span><span class="hz-team-meta">Case B · FinTrust Bank · submitted by email after the deadline, accepted without penalty</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>95</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">⚠️</span><span><strong>Notebook in Colab, shared.</strong> Shared, but there is no title cell with the team, members, and case.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>loan_default.csv</code> read from the course URL.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> Shape, types, first rows, missing values per column, and 60 duplicates, followed by a written reading: you already spotted <code>Auto</code> vs <code>car</code> and suggested a reason for the gaps in each column.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> In your own words: the safest customer profile, for the commercial manager to target pre-approved loan campaigns.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Your explanations for the gaps (“probably unemployed”, “young people with no history”) are hypotheses: say so, and check them in Advance 2 (for example, are missing <code>years_employed</code> really <code>unemployed</code>?).</li><li>To find misspelled labels, list each text column with <code>df["loan_purpose"].value_counts()</code>, then normalize with <code>.str.strip().str.lower()</code> and count again: if the count of distinct labels drops, some were written in several ways.</li></ul>
</div>
</div>
<div class="hz-team">
<div class="hz-team-head"><span class="hz-team-name">zipzip</span><span class="hz-team-meta">Case A · TalentCo · submitted after the deadline, accepted without penalty</span><button type="button" class="hz-reveal">Reveal</button></div>
<div class="hz-revealed" hidden>
<p class="hz-grade"><strong>100</strong> 🟢</p>
<ul class="hz-checks"><li><span class="hz-mark">✅</span><span><strong>Registered in the mailbox.</strong> Team and case registered.</span></li><li><span class="hz-mark">✅</span><span><strong>Notebook in Colab, shared.</strong> Shared, with the team, section, and member at the top.</span></li><li><span class="hz-mark">✅</span><span><strong>Data loaded from its URL.</strong> <code>employee_compensation.csv</code> read from the course URL through a <code>DATA_URL</code> variable, kept untouched in <code>raw</code>.</span></li><li><span class="hz-mark">✅</span><span><strong>First inspection.</strong> First rows, types, missing values per column, 97 duplicates, and <code>describe()</code>, followed by a clear reading: ages of 1 and 119, experience from −10 to 78, scores of −1 and 99, and salaries from 5,342 to 394,249.</span></li><li><span class="hz-mark">✅</span><span><strong>Business question and its user.</strong> What explains salary and which differences experience does not justify, for HR to decide whether to adjust salary bands, with <code>Salary</code> as the target of a regression.</span></li></ul>
<p class="hz-tips-title">How to improve</p>
<ul class="hz-tips"><li>Submit each advance through the mailbox by its deadline: this one arrived a week late.</li></ul>
</div>
</div>
</div>

