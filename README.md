# Machine Learning and Business Applications · Intensive Format

Intensive edition (6 weeks, 26 Oct – 4 Dec 2026) of the course [usm-course](https://github.com/hizocar/usm-course).

Site: https://hizocar.github.io/usm-course-intensivo/

## How the site works

- **Runnable notebooks.** `docs/javascripts/pyrunner.js` adds a ▶ button to every code cell and makes the code editable. Python runs in the browser with [Pyodide](https://pyodide.org) inside a Web Worker (`docs/javascripts/pyworker.js`), with numpy, pandas, scikit-learn, matplotlib, statsmodels, and seaborn.
- **Interactive explainers.** A notebook Markdown cell with `<div class="hz-widget" data-widget="NAME">` is replaced on the site by the explainer in `docs/javascripts/explainers/NAME.js`. In Colab the fallback text inside the div shows instead. Shared helpers are in `docs/javascripts/hz-core.js`, and styles are in `docs/stylesheets/interactive.css`.
- **Team mailbox.** The forms in `docs/project/mailbox.md` post to a Google Apps Script web app (`tools/mailbox/Code.gs`) that writes to the course spreadsheet.

### Opening the mailbox

1. Open the spreadsheet *ML Intensive 2026 · Team mailbox* › **Extensions › Apps Script**, and paste `tools/mailbox/Code.gs`.
2. **Deploy › New deployment › Web app**, with *Execute as: Me* and *Who has access: Anyone*. Authorize it.
3. Paste the `/exec` URL into `ENDPOINT` at the top of `docs/javascripts/mailbox.js` and push.

## Build locally

```bash
poetry install
poetry run mkdocs serve
```
