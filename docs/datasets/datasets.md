# Datasets

To load a file in Colab, copy its URL and use it with `pd.read_csv` (or `pd.read_excel` for `.xlsx` files):

```python
import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/loan_default.csv")
```

## Final project

| File | Case | Rows | URL for Colab | Download |
|---|---|--:|---|:--:|
| `employee_compensation.csv` | A · TalentCo (regression) | ~10,000 | `https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/employee_compensation.csv` | [CSV](employee_compensation.csv) |
| `loan_default.csv` | B · FinTrust Bank (classification) | ~10,000 | `https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/loan_default.csv` | [CSV](loan_default.csv) |

??? info "Data dictionary: `employee_compensation.csv`"

    | Variable | Type | Description |
    |---|---|---|
    | `Salary` | Numeric | Gross annual salary in USD. **Target variable.** |
    | `Years_Experience` | Numeric | Years of professional experience |
    | `Age` | Numeric | Age |
    | `Performance_Score` | Numeric | Most recent performance rating (1.0 to 5.0) |
    | `Education_Level` | Categorical | `Bachelor`, `Master`, `PhD` |
    | `Department` | Categorical | `Engineering`, `Sales`, `Marketing`, `HR`, `Finance` |
    | `Region` | Categorical | `North`, `South`, `East`, `West` |
    | `Job_Level` | Categorical | `Junior`, `Mid`, `Senior` |
    | `Gender` | Categorical | `Male`, `Female` |

??? info "Data dictionary: `loan_default.csv`"

    | Variable | Type | Description |
    |---|---|---|
    | `loan_id` | ID | Loan identifier. Do not use it as a model feature. |
    | `age` | Numeric | Applicant's age |
    | `annual_income` | Numeric | Gross annual income (USD) |
    | `employment_type` | Categorical | `full_time`, `part_time`, `self_employed`, `unemployed` |
    | `years_employed` | Numeric | Years at current employer |
    | `loan_amount` | Numeric | Amount requested (USD) |
    | `loan_term_months` | Numeric | Term in months (12, 24, 36, 48, 60) |
    | `interest_rate` | Numeric | Annual interest rate (%) |
    | `loan_purpose` | Categorical | `personal`, `home`, `car`, `education`, `business` |
    | `credit_score` | Numeric | Credit score (valid range: 300 to 850) |
    | `num_credit_lines` | Numeric | Active credit lines |
    | `debt_to_income_ratio` | Numeric | Debt payments / gross income (0 to 1) |
    | `has_collateral` | Binary | Loan is backed by collateral (1 = yes, 0 = no) |
    | `num_late_payments` | Numeric | Late payments in the borrower's history |
    | `region` | Categorical | `North`, `South`, `East`, `West` |
    | `default` | Binary | **Target variable.** 1 = defaulted, 0 = repaid |

## Used in class

| File | Class | Download |
|---|---|:--:|
| `StockData.csv` / `StockData.xlsx` | Class 3: pandas | [CSV](StockData.csv) · [XLSX](StockData.xlsx) |
| `Housing.csv` | Supplement: cross-validation | [CSV](Housing.csv) |
| `Tourism.xlsx` | Classes 11 and 12b | [XLSX](Tourism.xlsx) |
| `healthcare_data.csv` | Class 6: linear regression | [CSV (44 MB, semester course repository)](https://raw.githubusercontent.com/hizocar/USM-COURSE/main/docs/datasets/healthcare_data.csv) |
