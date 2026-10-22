# Sprints

Sprints split the project into stages that follow the course content. **They are not graded**: they help track progress and give you feedback in time to act on it.

## How they work

- From Sprint 1 on, your project notebook is shared with **hizocar@gmail.com** (commenter access). You don't send anything for each sprint: I review the current version in Colab.
- Reviews take place during the **workshop** of the session listed below. Each team gets a traffic light:

| Traffic light | Meaning |
|---|---|
| 🟢 **Green** | On track. Keep going. |
| 🟡 **Yellow** | Something needs adjusting before the next sprint. Check the comments in your notebook. |
| 🔴 **Red** | There is a problem that could affect the final submission. Let's talk during the same workshop. |

| Sprint | Content it applies | Starts in | Reviewed in |
|---|---|---|---|
| [1 · Data in Colab](#sprint-1-data-in-colab) | Session 1: Python and Colab | Session 1 | Session 2 (Nov 4 and 6) |
| [2 · Data cleaning and exploratory analysis](#sprint-2-data-cleaning-and-exploratory-analysis) | Session 2: pandas and seaborn | Session 2 | Session 3 (Nov 11 and 13) |
| [3 · First model](#sprint-3-first-model) | Sessions 3 and 4: regression and classification | Session 3 | Session 5 (Nov 25 and 27) |
| Final submission | Session 5: trees and communication | Session 5 | Dec 1 (submission), Dec 2 and 4 (presentation) |

---

## Sprint 1 · Data in Colab

*Worked on in the session 1 workshop. Reviewed in session 2.*

- [ ] Team registered (2 or 3 members) and case chosen. If it is your own case, include the written proposal for approval.
- [ ] Notebook created in Colab and shared with the whole team and with hizocar@gmail.com.
- [ ] The data is loaded from a URL with `pd.read_csv`.
- [ ] First inspection: `shape`, data types, first rows, number of missing values, and number of duplicates.
- [ ] The case's business question written in your own words in two or three lines.

---

## Sprint 2 · Data cleaning and exploratory analysis

*Worked on in the session 2 workshop. Reviewed in session 3.*

- [ ] Duplicates removed and missing values handled, with the decision justified.
- [ ] Inconsistent categories unified (for example, `"bachelor"`, `"Bachelor"`, and `"BACHELOR"`).
- [ ] Impossible values (negative ages, scores out of range) detected and fixed.
- [ ] Cleaning summary table: issue, decision, and rows affected.
- [ ] At least four exploratory charts, including how the variables relate to the target.
- [ ] Three written findings, each with what it means for the business.

---

## Sprint 3 · First model

*Starts in session 3 and continues in the session 4 clinic. Reviewed in session 5.*

- [ ] Categorical variables encoded (for example, with `pd.get_dummies`).
- [ ] Data split into training and test sets **before** training.
- [ ] Baseline model trained: linear regression (case A) or logistic regression (case B).
- [ ] Metrics computed on the test data and chosen to fit the problem.
- [ ] At least two coefficients interpreted in business terms.

---

## Final submission

*Worked on in the session 5 workshop.*

- [ ] Second model (decision tree or random forest) trained and evaluated on the same split.
- [ ] Model comparison table and a justified choice.
- [ ] Feature importance for the chosen model.
- [ ] Three recommendations and the limitations of the analysis.
- [ ] A 10-minute presentation with a pyramid structure.
- [ ] Checklist from the [Colab guide](../colab.md#6-before-the-final-submission) completed.

All submission details and the rubric are in the [project brief](project.md).
