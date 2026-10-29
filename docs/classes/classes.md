# Classes

All five classes follow one company: **Cordillera Mobile**, a mobile carrier that has just hired you as an analyst. Two teams bring you questions. The commercial team asks *what drives a customer's monthly bill?* The retention team asks *which customers are about to cancel, and whom should we call?*

Each class moves that analysis one step forward, and that step is exactly the one your team takes that week in its own project. You watch it done with Cordillera on Wednesday or Friday, then do the same with your case and hand it in on Tuesday.

<div class="hz-thread" markdown>

<div class="hz-thread-step" markdown>
<span class="hz-step">Session 1</span>
### [Day one at Cordillera Mobile](Session_1_Day_One.ipynb)
Python in Colab, from a single customer to thousands at once with NumPy. We open the raw customer file for the first time.

<span class="hz-thread-adv">→ Advance 1 · team, data, and question</span>
</div>

<div class="hz-thread-step" markdown>
<span class="hz-step">Session 2</span>
### [Cleaning the customer base](Session_2_Cleaning.ipynb)
pandas and seaborn. We find every problem in the data, fix it with decisions we can defend, and find the first patterns.

<span class="hz-thread-adv">→ Advance 2 · cleaning and exploratory analysis</span>
</div>

<div class="hz-thread-step" markdown>
<span class="hz-step">Session 3</span>
### [What drives the monthly bill?](Session_3_Monthly_Bill.ipynb)
Linear regression. Train and test, coefficients a manager can read, MAE, RMSE, R², overfitting, and cross-validation.

<span class="hz-thread-adv">→ Advance 3 · ready to model</span>
</div>

<div class="hz-thread-step" markdown>
<span class="hz-step">Session 4</span>
### [Who is about to leave?](Session_4_Churn.ipynb)
Logistic regression. The accuracy trap, the confusion matrix, and a threshold chosen with money instead of habit.

<span class="hz-thread-adv">→ Advance 4 · the right metric</span>
</div>

<div class="hz-thread-step" markdown>
<span class="hz-step">Session 5</span>
### [Better models, a clearer story](Session_5_Better_Models.ipynb)
Decision trees, random forests, ROC curves, and turning the results into a presentation with the [pyramid principle](Pyramid_Presentations.html){ target="_blank" }.

<span class="hz-thread-adv">→ Final project</span>
</div>

</div>

## How to use a class

Every class runs **in your browser**. Press ▶ next to a cell (or ++shift+enter++), edit the code and run it again; cells share variables, as in Colab. The animated explainers inside each class respond when you drag, slide, or press play, and the *Check yourself* questions tell you right away whether you got the idea.

!!! tip "Browser or Colab?"
    The browser is the quickest way to follow a class: nothing to install, nothing to save, and the first run takes a few seconds while Python downloads. For the **project**, work in Colab, where your notebook is saved and shared with your team ([Colab guide](../colab.md)). To open a class in Colab, use the **Open in Colab** button at the top of the class.

The data is in [Datasets](../datasets/datasets.md): `cordillera_mobile.csv` (raw, as it arrives in session 1) and `cordillera_mobile_clean.csv` (after the session 2 cleaning).

## Reference

These notebooks come from the semester edition of the course. They are not part of the classes, but they cover some topics in more depth if you want to go further.

| Notebook | Topic | Colab |
|---|---|:--:|
| [Introduction to Python](Class_1_Intro_to_Python.ipynb) | Python syntax, data structures, functions | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_1_Intro_to_Python.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [NumPy](Class_2_NumPy.ipynb) | Arrays, functions, indexing | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_2_NumPy.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [pandas](Class_3_Pandas.ipynb) | Series, DataFrames, merging, dates | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_3_Pandas.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Visualization with seaborn](Supplement_Seaborn.ipynb) | seaborn basics | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Supplement_Seaborn.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Linear regression](Class_6_Linear_Regression.ipynb) | Hospital length of stay: OLS, assumptions, diagnostics | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_6_Linear_Regression.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Underfitting and overfitting](Class_6a_Underfitting_and_Overfitting.ipynb) | Polynomial regression | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_6a_Underfitting_and_Overfitting.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Cross-validation](Class_7_Cross_Validation.ipynb) | Housing prices: RFE and k-fold | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_7_Cross_Validation.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Logistic regression and error metrics](Class_11_Logistic_Regression_and_Error_Metrics.ipynb) | Travel package purchases | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_11_Logistic_Regression_and_Error_Metrics.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| [Decision trees and random forests](Class_12b_Decision_Trees_and_Random_Forest.ipynb) | Travel package purchases, tuning, ROC | <a href="https://colab.research.google.com/github/hizocar/usm-course-intensivo/blob/main/docs/classes/Class_12b_Decision_Trees_and_Random_Forest.ipynb" target="_blank" rel="noopener"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |

Topics outside the intensive format (statistical inference, hypothesis testing, bootstrapping, ridge and lasso, nonlinear regression, SVMs) are in the [semester course](https://hizocar.github.io/usm-course/clases/clases/).
