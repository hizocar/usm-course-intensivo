"""Build the Cordillera Mobile dataset that the five classes follow.

Cordillera Mobile is a fictional mobile carrier. Its data answers the two
questions that mirror the project cases:
  - what drives a customer's monthly bill  (regression, like TalentCo)
  - which customers will cancel            (classification, like FinTrust)

The raw file is dirty on purpose (duplicates, inconsistent categories,
impossible values, missing values) so that session 2 has real cleaning to do.
The clean file is the raw file after `clean()`, which is exactly what the
session 2 notebook does; sessions 3 to 5 start from it.

    python tools/data/make_cordillera.py
"""
from pathlib import Path

import numpy as np
import pandas as pd

OUT = Path(__file__).resolve().parents[2] / "docs" / "datasets"
N = 5000
SNAPSHOT = pd.Timestamp("2026-09-30")

PLANS = ["Prepaid", "Basic", "Plus", "Unlimited"]
PLAN_BASE = {"Prepaid": 9.0, "Basic": 18.0, "Plus": 29.0, "Unlimited": 42.0}
PLAN_DATA = {"Prepaid": 4.0, "Basic": 8.0, "Plus": 15.0, "Unlimited": 30.0}
REGIONS = ["Metropolitana", "Centro", "Sur", "Norte"]
CONTRACTS = ["Month-to-month", "12 months", "24 months"]
PAYMENTS = ["Credit card", "Debit card", "Bank transfer", "Cash"]


def generate(seed=2026):
    rng = np.random.default_rng(seed)
    plan = rng.choice(PLANS, N, p=[0.25, 0.30, 0.28, 0.17])
    region = rng.choice(REGIONS, N, p=[0.45, 0.20, 0.20, 0.15])
    age = np.clip(rng.normal(38, 12, N), 18, 80).round().astype(int)

    # Prepaid has no contract; longer contracts are more common on bigger plans.
    contract = np.where(
        plan == "Prepaid",
        "Month-to-month",
        [rng.choice(CONTRACTS, p=[0.45, 0.33, 0.22]) for _ in range(N)],
    )
    signup = SNAPSHOT - pd.to_timedelta(rng.integers(30, 7 * 365, N), unit="D")
    tenure = ((SNAPSHOT - signup).days / 30.44).astype(int)

    data_gb = np.array([rng.gamma(4.0, PLAN_DATA[p] / 4.0) for p in plan]).round(1)
    call_minutes = rng.gamma(3.0, 75.0, N).round().astype(int)
    intl_roaming = (rng.random(N) < 0.10).astype(int)
    autopay = (rng.random(N) < 0.45).astype(int)
    payment = np.where(autopay == 1, rng.choice(PAYMENTS[:3], N), rng.choice(PAYMENTS, N, p=[0.3, 0.3, 0.2, 0.2]))
    # The north has weaker coverage, so more complaints.
    tickets = rng.poisson(np.where(region == "Norte", 1.4, 0.7))

    per_gb = np.where(plan == "Unlimited", 0.10, 0.55)
    discount = np.select([contract == "12 months", contract == "24 months"], [2.0, 4.0], 0.0)
    bill = (
        np.vectorize(PLAN_BASE.get)(plan)
        + per_gb * data_gb
        + 0.012 * call_minutes
        + 8.0 * intl_roaming
        - discount
        + rng.normal(0, 3.0, N)
    ).round(2)

    month_to_month = contract == "Month-to-month"
    logit = (
        -2.4
        + 0.9 * month_to_month
        + 0.15 * tickets
        - 0.008 * tenure
        - 0.6 * autopay
        + 0.3 * (age < 25)
        # Threshold and interaction effects: a straight logistic line misses them, trees catch them.
        + 1.6 * (tenure < 6)                                                # new customers still shopping around
        + 1.8 * ((region == "Norte") & (tickets >= 2))                      # complaints about coverage in the north
        + 1.3 * (month_to_month & (tickets >= 3))                           # unhappy and free to leave
        + 1.0 * ((bill - np.vectorize(PLAN_BASE.get)(plan)) > 12)           # bill shock from extra data
        - 1.2 * ((plan == "Unlimited") & ~month_to_month)                   # heavy users on contract are locked in
    )
    churned = (rng.random(N) < 1 / (1 + np.exp(-logit))).astype(int)

    df = pd.DataFrame({
        "customer_id": [f"CM-{10001 + i}" for i in range(N)],
        "signup_date": signup.strftime("%Y-%m-%d"),
        "age": age,
        "region": region,
        "plan": plan,
        "contract": contract,
        "tenure_months": tenure,
        "data_gb": data_gb,
        "call_minutes": call_minutes,
        "intl_roaming": intl_roaming,
        "support_tickets": tickets,
        "autopay": autopay,
        "payment_method": payment,
        "monthly_bill": bill,
        "churned": churned,
    })
    return dirty(df, rng)


def dirty(df, rng):
    df = df.copy()
    idx = lambda share: rng.choice(df.index, int(len(df) * share), replace=False)

    # Inconsistent spelling of categories, as typed by different branches.
    for col, variants in {
        "region": {"Metropolitana": ["metropolitana", "METROPOLITANA", "Metropolitana "], "Norte": ["norte", "NORTE"], "Sur": ["sur", "Sur "]},
        "plan": {"Plus": ["plus", "PLUS"], "Unlimited": ["unlimited", "Unlimited ", "UNLIMITED"], "Basic": ["basic"]},
    }.items():
        for i in idx(0.06):
            options = variants.get(df.at[i, col])
            if options:
                df.at[i, col] = rng.choice(options)

    df.loc[idx(0.003), "age"] = rng.choice([-1, 0, 150, 999], 15)
    df.loc[idx(0.04), "data_gb"] = np.nan
    df.loc[idx(0.03), "payment_method"] = np.nan
    df.loc[idx(0.002), "monthly_bill"] = -rng.uniform(5, 40, 10).round(2)
    typo = idx(0.001)
    df.loc[typo, "monthly_bill"] = (df.loc[typo, "monthly_bill"] * 100).round(2)  # decimal point lost

    dupes = df.loc[idx(0.015)]
    return pd.concat([df, dupes]).sample(frac=1, random_state=7).reset_index(drop=True)


def clean(raw):
    """The cleaning decisions made in session 2."""
    df = raw.drop_duplicates().copy()
    for col in ["region", "plan"]:
        df[col] = df[col].str.strip().str.title()
    df.loc[~df["age"].between(18, 100), "age"] = np.nan
    df["age"] = df["age"].fillna(df["age"].median()).astype(int)
    df["data_gb"] = df["data_gb"].fillna(df.groupby("plan")["data_gb"].transform("median"))
    df["payment_method"] = df["payment_method"].fillna("Unknown")
    df = df[df["monthly_bill"].between(0, 300)]
    return df.reset_index(drop=True)


if __name__ == "__main__":
    raw = generate()
    raw.to_csv(OUT / "cordillera_mobile.csv", index=False)
    clean(raw).to_csv(OUT / "cordillera_mobile_clean.csv", index=False)
    print(f"raw {raw.shape}, clean {clean(raw).shape}, churn rate {raw['churned'].mean():.1%}")
