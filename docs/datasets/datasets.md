# Datasets

Para cargar un archivo en Colab, copia su URL y úsala con `pd.read_csv` (o `pd.read_excel` para los `.xlsx`):

```python
import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/loan_default.csv")
```

## Proyecto final

| Archivo | Caso | Filas | URL para Colab | Descarga |
|---|---|--:|---|:--:|
| `employee_compensation.csv` | A · TalentCo (regresión) | ~10.000 | `https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/employee_compensation.csv` | [CSV](employee_compensation.csv) |
| `loan_default.csv` | B · FinTrust Bank (clasificación) | ~10.000 | `https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/loan_default.csv` | [CSV](loan_default.csv) |

??? info "Diccionario de `employee_compensation.csv`"

    | Variable | Tipo | Descripción |
    |---|---|---|
    | `Salary` | Numérica | Sueldo bruto anual en USD. **Variable objetivo.** |
    | `Years_Experience` | Numérica | Años de experiencia profesional |
    | `Age` | Numérica | Edad |
    | `Performance_Score` | Numérica | Última evaluación de desempeño (1.0 a 5.0) |
    | `Education_Level` | Categórica | `Bachelor`, `Master`, `PhD` |
    | `Department` | Categórica | `Engineering`, `Sales`, `Marketing`, `HR`, `Finance` |
    | `Region` | Categórica | `North`, `South`, `East`, `West` |
    | `Job_Level` | Categórica | `Junior`, `Mid`, `Senior` |
    | `Gender` | Categórica | `Male`, `Female` |

??? info "Diccionario de `loan_default.csv`"

    | Variable | Tipo | Descripción |
    |---|---|---|
    | `loan_id` | ID | Identificador del crédito. No usar como variable del modelo. |
    | `age` | Numérica | Edad del solicitante |
    | `annual_income` | Numérica | Ingreso bruto anual (USD) |
    | `employment_type` | Categórica | `full_time`, `part_time`, `self_employed`, `unemployed` |
    | `years_employed` | Numérica | Años en el empleo actual |
    | `loan_amount` | Numérica | Monto solicitado (USD) |
    | `loan_term_months` | Numérica | Plazo en meses (12, 24, 36, 48, 60) |
    | `interest_rate` | Numérica | Tasa de interés anual (%) |
    | `loan_purpose` | Categórica | `personal`, `home`, `car`, `education`, `business` |
    | `credit_score` | Numérica | Puntaje de crédito (rango válido: 300 a 850) |
    | `num_credit_lines` | Numérica | Líneas de crédito activas |
    | `debt_to_income_ratio` | Numérica | Pagos de deuda / ingreso bruto (0 a 1) |
    | `has_collateral` | Binaria | Tiene garantía (1 = sí, 0 = no) |
    | `num_late_payments` | Numérica | Pagos atrasados en su historial |
    | `region` | Categórica | `North`, `South`, `East`, `West` |
    | `default` | Binaria | **Variable objetivo.** 1 = no pagó, 0 = pagó |

## Usados en clases

| Archivo | Clase | Descarga |
|---|---|:--:|
| `StockData.csv` / `StockData.xlsx` | Clase 3: pandas | [CSV](StockData.csv) · [XLSX](StockData.xlsx) |
| `Housing.csv` | Complemento: validación cruzada | [CSV](Housing.csv) |
| `Tourism.xlsx` | Clases 11 y 12b | [XLSX](Tourism.xlsx) |
| `healthcare_data.csv` | Clase 6: regresión lineal | [CSV (44 MB, repositorio del curso semestral)](https://raw.githubusercontent.com/hizocar/USM-COURSE/main/docs/datasets/healthcare_data.csv) |
