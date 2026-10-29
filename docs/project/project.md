# Final project

!!! abstract "How the course is graded"
    You work on one project for the whole course. It is graded in two parts:

    - **Weekly advances, 30%:** four advances, one after each content session. See [weekly progress](progress.md).
    - **Final project, 70%:** the finished notebook and the presentation, graded with the rubric below.

    Course grade = 0.3 × average of the advances + 0.7 × final project.

## Goal

Solve a business problem with data, end to end, in a Google Colab notebook. The project has to show the four skills of the course:

| Skill | What we expect to see |
|---|---|
| **Python in Colab** | A clean notebook that runs from start to finish without errors. |
| **Data analysis** | Clean data, documented data quality issues, and an exploratory analysis with findings. |
| **Models** | At least two trained models, evaluated on test data and compared with the right metric. |
| **Communication** | Concrete recommendations for the business, presented in 10 minutes. |

## Teams

- **2 or 3 members**, from the same section.
- Teams and cases are registered in the [team mailbox](mailbox.md) at the end of **session 1** (October 28 or 30).

## Cases

Each team chooses **one** of these cases. The data is "dirty" on purpose: cleaning it is part of the job.

=== "Case A · TalentCo (regression)"

    **What drives an employee's salary?**

    TalentCo suspects its pay structure is inconsistent: people with similar experience earn different amounts depending on their department, region, or education level. The people team wants to know which variables explain salary and whether there are gaps to fix.

    - **Data:** [`employee_compensation.csv`](../datasets/datasets.md), about 10,000 rows and 9 columns.
    - **Target variable:** `Salary` (annual salary in USD).
    - **Minimum models:** linear regression and a tree-based model (`DecisionTreeRegressor` or `RandomForestRegressor`).
    - **Metrics:** MAE, RMSE, and R² on test data.

=== "Case B · FinTrust Bank (classification)"

    **Which customers will not repay their loan?**

    FinTrust's default rate keeps rising. The risk team wants a model that flags applicants who are likely to default before their loan is approved.

    - **Data:** [`loan_default.csv`](../datasets/datasets.md), about 10,000 rows and 16 columns.
    - **Target variable:** `default` (1 = defaulted, 0 = repaid).
    - **Minimum models:** logistic regression and a tree-based model (`DecisionTreeClassifier` or `RandomForestClassifier`).
    - **Metrics:** confusion matrix, precision, recall, F1, and AUC. Justify which one matters most, considering the cost of approving someone who defaults versus rejecting someone who would have repaid.

=== "Case C · Your own case"

    You can propose a different problem with public data (for example, from Kaggle or a government open data portal) if it meets these conditions:

    - At least **1,000 rows** and a clear target variable (numeric or categorical).
    - A business question that a model can answer.
    - The data can be read from a public URL.

    Your own case must be **approved in Advance 1**.

## What the notebook must contain

1. **Context and business question.** What problem you are solving and for whom.
2. **Loading and describing the data.** Size, variable types, and a short data dictionary.
3. **Cleaning.** Duplicates, missing values, inconsistent categories, and impossible values. A summary table with each issue, the decision you made, and how many rows it affected.
4. **Exploratory analysis.** At least four relevant charts, each with one sentence explaining what it shows. Close with 3 to 5 findings.
5. **Preparing for modeling.** Encoding categorical variables and splitting into training and test sets.
6. **Models.** At least two models, evaluated on the same test split.
7. **Comparison and choice.** A table with each model's metrics and a justification for the model you choose.
8. **Interpretation.** Which variables matter most in the model and what that means for the business.
9. **Recommendations.** Three concrete actions the company could take, and the limitations of your analysis.

## Submission

| What | When | How |
|---|---|---|
| Colab notebook | **Tuesday, December 1, 23:59** | [Team mailbox](mailbox.md), choosing *Final project* |
| Notebook (`.ipynb`) and slides (PDF) | **Tuesday, December 1, 23:59** | Email to hizocar@gmail.com with the subject `[ML Intensive] Final project – Section – Team name` |
| Presentation, Casa Central | **Wednesday, December 2, 16:05** | In the classroom |
| Presentation, Vitacura | **Friday, December 4, 11:05** | In the classroom |

The presentation lasts **10 minutes plus 5 for questions**, and every team member must take part. The presentation order is published on Monday, November 30.

## Rubric

This rubric gives the final project grade (70% of the course). The weights below add up to 100% of that grade.

| Criterion | Weight | Full marks (7.0) |
|---|:--:|---|
| **Python and reproducibility** | 15% | The notebook runs end to end with *Restart session and run all*. The code is tidy, with headings and text explaining each step. The data is read from a URL. |
| **Cleaning and exploratory analysis** | 25% | Data quality issues are found and fixed, and each decision is justified. Charts are relevant and each one has a conclusion. Findings connect to the business question. |
| **Modeling and evaluation** | 30% | At least two models with a training and test split and no data leakage. The chosen metric fits the problem. The comparison is fair and the choice is well argued. |
| **Interpretation and recommendations** | 15% | You explain which variables matter and how. Recommendations are concrete, follow from the results, and acknowledge limitations. |
| **Oral presentation** | 15% | Pyramid structure: the conclusion comes first. Clear charts, stays within 10 minutes, everyone takes part, and questions are answered well. |

Grades use the Chilean scale from 1.0 to 7.0, where 4.0 is a pass.

!!! note "Advances and the final grade are connected"
    Each advance is a piece of the final notebook. The comments you get on an advance are the fastest way to raise the final grade: fix them before the next one, and you reach December without surprises.
