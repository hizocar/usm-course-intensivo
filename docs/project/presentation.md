# Final presentation

The final presentation is where your project becomes a decision. You present to the people who asked the question: **TalentCo's people team** (case A), **FinTrust's risk committee** (case B), or the decision makers of your own case. They are managers, not data scientists. They want to know what to do, why, and how sure you are.

!!! info "Key facts"
    - **When:** Wednesday, December 2, 16:05 (Casa Central) and Friday, December 4, 11:05 (Vitacura). The order is published on Monday, November 30.
    - **Length:** **10 minutes** of presentation plus **5 minutes** of questions. At 9 minutes you get a signal; at 10 minutes we stop.
    - **Who speaks:** **every team member** presents a part and answers questions.
    - **Slides:** a PDF of at most **10 slides** (plus an optional appendix for questions), emailed with the notebook by **Tuesday, December 1, 23:59** as described in the [project brief](project.md#submission).
    - **Weight:** the presentation is the *Oral presentation* criterion of the [rubric](project.md#rubric) (15% of the final project grade). Your recommendations also count toward *Interpretation and recommendations* (15%).

## What to present

Your presentation answers the business question with the evidence from your notebook. It must contain:

1. **The answer.** Your recommendation, in one sentence, on the first content slide.
2. **The question and why it matters.** Which decision it informs and who takes it.
3. **Three arguments** that support the answer, each backed by one chart or one number from your analysis (exploration, models, or what drives the predictions).
4. **How good the model is, in business terms.** Which model you chose and why, with its error in the units the business understands: "our salary estimate is typically off by USD 4,700" or "the model catches 7 of 10 defaulters at the cost of rejecting 1 good client in 8".
5. **Three recommendations** concrete enough to act on next month.
6. **Limitations.** What the data or the model cannot tell, and what you would do with more time or data.

What **not** to present: code, the cleaning step by step, every chart you made, or the history of how you got there. That is in the notebook.

## How: the pyramid principle

A manager decides in the first minute whether to keep listening. The pyramid principle puts the **answer first**, then the **arguments** that support it, then the **evidence** under each argument. It is the opposite of a report, which builds up to its conclusion at the end.

<div class="hz-widget" data-widget="pyramid">
<p>Interactive explainer: open this page on the course website to use it.</p>
</div>

The explainer uses Cordillera Mobile, the company from the classes. The [pyramid presentations class](../classes/Pyramid_Presentations.html){ target="_blank" } and the last part of [session 5](../classes/Session_5_Better_Models.ipynb) go deeper.

### The top of the pyramid: one sentence

Write the key message before you make a single slide. It answers the question, says what to do, and carries a number.

| Weak | Strong |
|---|---|
| "We analyzed salaries at TalentCo." | "TalentCo pays up to USD … less for the same role and experience in the … region; aligning those salaries costs USD … a year." |
| "Our model predicts defaults." | "Rejecting applicants with a predicted risk above …% would cut losses by about USD … per 1,000 loans, with … fewer approvals." |

Fill in the dots with your own results. If you cannot write this sentence, the analysis is not finished yet.

### Slide titles that say something

Every slide title is a full sentence with the slide's conclusion, so that reading only the titles tells the whole story. "Salary by department" is a label; "Engineering earns 18% more than Sales at the same job level" is a message.

### A structure that works

| # | Slide | Content | Time |
|:--:|---|---|:--:|
| 1 | Title | Team, case, and the key message | 0:30 |
| 2 | The answer | Key message and the three arguments in one view | 1:00 |
| 3 | The question | The decision, who takes it, and what is at stake (money, people, risk) | 1:00 |
| 4–6 | Arguments 1 to 3 | One argument per slide: an action title and one clear chart or number | 1:30 each |
| 7 | How much to trust it | The chosen model against the others, with its error or cost in business units | 1:00 |
| 8 | Recommendations | Three actions: what, who, and the expected impact | 1:30 |
| 9 | Limitations and next steps | What the analysis cannot say and what you would do next | 0:30 |
| 10 | Closing | The key message again | 0:30 |
| — | Appendix | Backup slides for questions: data cleaning, metrics, extra charts | — |

## What we expect

- **Charts a manager can read in five seconds:** one message per chart, large labels (18 pt or more), axes in business units, the important part highlighted. No raw `df.describe()` tables or code screenshots.
- **Numbers in context:** USD, percentages, and counts the audience understands. "R² = 0.88" alone means nothing to a people team; "the model explains 88% of the differences in salary" does.
- **Honest evidence:** every claim on a slide is backed by your notebook. Say "is associated with", not "causes", unless you can show cause.
- **A shared story:** the team agrees on the key message, the transitions between speakers are smooth, and every member can answer questions about any part.
- **On time:** rehearse with a timer. Going over 10 minutes costs points and cuts your question time.

## Rubric

This rubric gives the score of the presentation, from 0 to 100. That score is the *Oral presentation* criterion (15% of the final project grade).

| Criterion | Weight |
|---|:--:|
| [Key message and pyramid structure](#key-message-and-pyramid-structure) | 25% |
| [Evidence and charts](#evidence-and-charts) | 25% |
| [Model and decision](#model-and-decision) | 20% |
| [Limitations and honesty](#limitations-and-honesty) | 10% |
| [Delivery and teamwork](#delivery-and-teamwork) | 10% |
| [Questions](#questions) | 10% |

Each criterion is scored at one of four levels; the presentation score is the weighted average.

### Key message and pyramid structure

*25% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | The answer comes first, in one sentence with a number. Three clear arguments support it. Slide titles alone tell the story. |
| **Good · 80** | The answer comes first, but it is vague or the arguments overlap. Most titles carry a message. |
| **Developing · 60** | The answer appears only at the end, or the structure follows the order of the work. |
| **Insufficient · 30** | There is no clear answer to the business question. |

### Evidence and charts

*25% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | Each argument rests on one well-chosen chart or number from the notebook, readable at a glance and in business units. |
| **Good · 80** | Evidence is correct, but some charts are cluttered, too small, or not tied to an argument. |
| **Developing · 60** | Several claims have no evidence, or charts need explaining to be understood. |
| **Insufficient · 30** | Charts are missing, unreadable, or contradict the notebook. |

### Model and decision

*20% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | The chosen model is justified against the alternatives, and its quality is expressed as money, people, or risk. Recommendations follow from the results and are concrete. |
| **Good · 80** | The model choice is justified, but its quality is shown only as a technical metric, or one recommendation is generic. |
| **Developing · 60** | The model is mentioned without comparison, or the recommendations do not follow from the results. |
| **Insufficient · 30** | No model results or no recommendations. |

### Limitations and honesty

*10% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | Clear limits of the data and the model, the difference between association and cause, and sensible next steps. |
| **Good · 80** | Limitations are listed but generic. |
| **Developing · 60** | Limitations are mentioned only when asked. |
| **Insufficient · 30** | Claims go beyond what the data supports. |

### Delivery and teamwork

*10% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | Within 10 minutes, every member presents, transitions are smooth, and the team speaks to the audience, not to the slides. |
| **Good · 80** | Slightly over time, or uneven participation. |
| **Developing · 60** | Reads from the slides, or clearly over time. |
| **Insufficient · 30** | Members missing, or far over time. |

### Questions

*10% of the presentation score*

| Level | What it looks like |
|---|---|
| **Excellent · 100** | Every member answers clearly and with evidence, and admits what the analysis cannot answer. |
| **Good · 80** | Most questions are answered well. |
| **Developing · 60** | Answers are vague, or only one member answers. |
| **Insufficient · 30** | Questions go unanswered. |

## Checklist before you present

- [ ] The key message fits in one sentence, comes first, and includes a number.
- [ ] Reading only the slide titles tells the whole story.
- [ ] Every chart has one message, large labels, and business units.
- [ ] The model's quality is stated in money, people, or risk, not only as a metric.
- [ ] Three recommendations: what, who, and expected impact.
- [ ] Limitations are on a slide.
- [ ] Every member has a part, and you rehearsed with a timer (under 10 minutes).
- [ ] The PDF and the notebook were sent by Tuesday, December 1, 23:59.
