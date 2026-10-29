# Weekly progress

The project moves forward **every week**. After each content session your team hands in an **advance**: the part of the project that applies what that session covered. There are four graded advances, and the fifth week ends with the final submission.

!!! abstract "How it counts"
    - **Weekly advances: 30% of the course grade** (4 advances, 7.5% each).
    - **Final project: 70%** (notebook and presentation, graded with the [rubric](project.md#rubric)).

## Calendar

Every advance is due on **Tuesday at 23:59**, the same for both sections, and is submitted through the [team mailbox](mailbox.md).

| Week | Session (Wed / Fri) | Advance | Due | Feedback in |
|:--:|---|---|---|---|
| 1 | Python in Colab (Oct 28 / 30) | [**Advance 1** · Team, data, and question](#advance-1-team-data-and-question) | Tue **Nov 3** | Session 2 |
| 2 | pandas and seaborn (Nov 4 / 6) | [**Advance 2** · Cleaning and exploratory analysis](#advance-2-cleaning-and-exploratory-analysis) | Tue **Nov 10** | Session 3 |
| 3 | Linear regression (Nov 11 / 13) | [**Advance 3** · Ready to model](#advance-3-ready-to-model) | Tue **Nov 17** | Session 4 |
| 4 | Classification (Nov 18 / 20) | [**Advance 4** · The right metric](#advance-4-the-right-metric) | Tue **Nov 24** | Session 5 |
| 5 | Trees and communication (Nov 25 / 27) | [**Final project**](#final-submission) | Tue **Dec 1** | Presentation |
| 6 | Presentations (Dec 2 / 4) | — | — | — |

## How advances are graded

Each advance is graded from 1.0 to 7.0 against its checklist. You get the grade and a traffic light, with comments in your notebook, during the next session's workshop.

| Grade | Traffic light | What it means |
|:--:|:--:|---|
| 6.0 – 7.0 | 🟢 | Every item is done and correct. Keep going. |
| 4.0 – 5.9 | 🟡 | Every item is there, but some need fixing before the next advance. |
| 2.0 – 3.9 | 🔴 | Important items are missing. We talk during the workshop. |
| 1.0 | ⚫ | Not submitted. |

- The notebook is reviewed **as it is at the deadline**. Colab keeps the version history, so later changes don't count for that advance (but they do help the next one).
- **Late submissions:** one point off for each day late, up to three days. After that the advance gets a 1.0.
- Every member of the team gets the same grade. If a member does not take part, let me know before the deadline.
- Each advance is a step towards the final notebook, so fixing the comments from one advance is part of the next.

---

## Advance 1 · Team, data, and question

*Work on it in the session 1 workshop. Due **Tuesday, November 3, 23:59**.*

- [ ] Team **registered in the [mailbox](mailbox.md)** (2 or 3 members, team name, and case). If it is your own case, include the proposal: it is approved or rejected in the feedback.
- [ ] Project notebook created in Colab and shared with the whole team (Editor) and with hizocar@gmail.com (Commenter).
- [ ] The data is loaded from its URL with `pd.read_csv`.
- [ ] First inspection: `shape`, data types, first rows, number of missing values per column, and number of duplicate rows.
- [ ] The case's business question, written in your own words in two or three lines, and who would use the answer.

---

## Advance 2 · Cleaning and exploratory analysis

*Work on it in the session 2 workshop. Due **Tuesday, November 10, 23:59**.*

- [ ] Duplicates removed and missing values handled, with each decision justified.
- [ ] Inconsistent categories unified (for example, `"bachelor"`, `"Bachelor"`, and `"BACHELOR"`).
- [ ] Impossible values (negative ages, scores out of range) detected and fixed.
- [ ] Cleaning summary table: issue, decision, and rows affected.
- [ ] At least four exploratory charts, including how the variables relate to the target. One sentence under each chart saying what it shows.
- [ ] Three written findings, each with what it means for the business.

---

## Advance 3 · Ready to model

*Work on it in the session 3 workshop. Due **Tuesday, November 17, 23:59**.*

- [ ] Categorical variables encoded (for example, with `pd.get_dummies`) and ID columns removed.
- [ ] Data split into training and test sets **before** any model is trained. The test set is not touched until evaluation.
- [ ] **Case A:** linear regression trained, with MAE, RMSE, and R² on the test set, and the training metrics next to them to check for overfitting.
- [ ] **Case B:** split stratified by `default`, and the baseline accuracy of a model that always predicts "repays". Explain in two lines why accuracy alone would be misleading here.
- [ ] A short paragraph: what you expect the model to find, based on your exploratory analysis.

---

## Advance 4 · The right metric

*Work on it in the session 4 workshop (modeling clinic). Due **Tuesday, November 24, 23:59**.*

- [ ] **Case A:** 5-fold cross-validation for the linear regression, at least two coefficients interpreted in business terms, and a justified choice between MAE and RMSE.
- [ ] **Case B:** logistic regression with its confusion matrix, precision, recall, F1, and AUC on the test set. A decision threshold chosen and justified with the cost of each type of error.
- [ ] A table with the metrics so far, which will be extended in the final submission.
- [ ] The key message of your presentation in **one sentence** (the top of the pyramid). It can still change.

---

## Final submission

*Work on it in the session 5 workshop. Due **Tuesday, December 1, 23:59**.*

- [ ] Second model (decision tree or random forest) trained and evaluated on the same split.
- [ ] Model comparison table and a justified choice.
- [ ] Feature importance for the chosen model, explained for the business.
- [ ] Three recommendations and the limitations of the analysis.
- [ ] A 10-minute presentation with a pyramid structure.
- [ ] Checklist from the [Colab guide](../colab.md#6-before-the-final-submission) completed.
- [ ] Notebook submitted through the [mailbox](mailbox.md), and slides emailed as described in the [project brief](project.md#submission).
