# Proyecto final

!!! abstract "Evaluación única del curso"
    El proyecto final es **el 100% de la nota**. Se trabaja durante todo el curso y se monitorea con tres [sprints](sprints.md) que no llevan nota.

## Objetivo

Resolver un problema de negocio con datos, de principio a fin, en un notebook de Google Colab. El proyecto tiene que mostrar las cuatro competencias del curso:

| Competencia | Qué se espera ver |
|---|---|
| **Python en Colab** | Un notebook ordenado que se ejecuta de principio a fin sin errores. |
| **Análisis de datos** | Datos limpios, problemas de calidad documentados y un análisis exploratorio con hallazgos. |
| **Modelos** | Al menos dos modelos entrenados, evaluados con datos de prueba y comparados con la métrica correcta. |
| **Comunicación** | Recomendaciones concretas para el negocio, presentadas en 10 minutos. |

## Equipos

- **2 o 3 integrantes**, de la misma sección.
- El equipo y el caso se inscriben al final de la **sesión 1** (28 o 30 de octubre).

## Casos

Cada equipo elige **uno** de estos casos. Los datos vienen "sucios" a propósito: limpiarlos es parte del trabajo.

=== "Caso A · TalentCo (regresión)"

    **¿Qué explica el sueldo de un empleado?**

    TalentCo sospecha que su estructura de sueldos no es consistente: personas con experiencia parecida ganan distinto según el departamento, la región o el nivel educativo. La gerencia de personas quiere saber qué variables explican el sueldo y si hay brechas que corregir.

    - **Datos:** [`employee_compensation.csv`](../datasets/datasets.md), unas 10.000 filas y 9 columnas.
    - **Variable objetivo:** `Salary` (sueldo anual en USD).
    - **Modelos mínimos:** regresión lineal y un modelo de árboles (`DecisionTreeRegressor` o `RandomForestRegressor`).
    - **Métricas:** MAE, RMSE y R² en datos de prueba.

=== "Caso B · FinTrust Bank (clasificación)"

    **¿Qué clientes no van a pagar su crédito?**

    La tasa de incumplimiento de FinTrust viene subiendo. El área de riesgo quiere un modelo que identifique a los solicitantes con alta probabilidad de no pagar antes de aprobar el crédito.

    - **Datos:** [`loan_default.csv`](../datasets/datasets.md), unas 10.000 filas y 16 columnas.
    - **Variable objetivo:** `default` (1 = no pagó, 0 = pagó).
    - **Modelos mínimos:** regresión logística y un modelo de árboles (`DecisionTreeClassifier` o `RandomForestClassifier`).
    - **Métricas:** matriz de confusión, precision, recall, F1 y AUC. Justifica cuál importa más considerando el costo de aprobar a alguien que no paga frente a rechazar a alguien que sí paga.

=== "Caso C · Caso propio"

    Puedes proponer otro problema con datos públicos (por ejemplo, de Kaggle o del portal de datos abiertos del gobierno) si cumple:

    - Al menos **1.000 filas** y una variable objetivo clara (numérica o categórica).
    - Una pregunta de negocio que se pueda responder con un modelo.
    - Que los datos se puedan leer desde una URL pública.

    El caso propio requiere **aprobación en el Sprint 1**.

## Qué debe contener el notebook

1. **Contexto y pregunta de negocio.** Qué problema se resuelve y para quién.
2. **Carga y descripción de los datos.** Tamaño, tipos de variables y un diccionario breve.
3. **Limpieza.** Duplicados, valores faltantes, categorías inconsistentes y valores imposibles. Una tabla resumen con cada problema, la decisión tomada y cuántas filas afectó.
4. **Análisis exploratorio.** Al menos cuatro gráficos relevantes, cada uno con una frase que explique qué muestra. Cierra con 3 a 5 hallazgos.
5. **Preparación para modelar.** Codificación de variables categóricas y separación en entrenamiento y prueba.
6. **Modelos.** Al menos dos modelos, evaluados con la misma partición de prueba.
7. **Comparación y elección.** Una tabla con las métricas de cada modelo y una justificación del modelo elegido.
8. **Interpretación.** Qué variables pesan más en el modelo y qué significa eso para el negocio.
9. **Recomendaciones.** Tres acciones concretas que la empresa podría tomar, y las limitaciones del análisis.

## Entrega

| Qué | Cuándo | Cómo |
|---|---|---|
| Notebook (`.ipynb`) y link de Colab | **Martes 1 de diciembre, 23:59** | Correo a hizocar@gmail.com con asunto `[ML Intensivo] Proyecto final – Sección – Apellidos` |
| Presentación (PDF) | **Martes 1 de diciembre, 23:59** | En el mismo correo |
| Presentación oral, Casa Central | **Miércoles 2 de diciembre, 16:05** | En la sala de clases |
| Presentación oral, Vitacura | **Viernes 4 de diciembre, 11:05** | En la sala de clases |

La presentación dura **10 minutos más 5 de preguntas**, y todos los integrantes deben participar. El orden de presentación se publica el lunes 30 de noviembre.

## Rúbrica

| Criterio | Peso | Logrado (nota 7) |
|---|:--:|---|
| **Python y reproducibilidad** | 15% | El notebook corre completo con *Reiniciar sesión y ejecutar todo*. El código está ordenado, con títulos y texto que explican cada paso. Los datos se leen desde una URL. |
| **Limpieza y análisis exploratorio** | 25% | Se detectan y corrigen los problemas de calidad, con cada decisión justificada. Los gráficos son pertinentes y cada uno tiene una conclusión. Los hallazgos conectan con la pregunta de negocio. |
| **Modelamiento y evaluación** | 30% | Al menos dos modelos con partición de entrenamiento y prueba, sin fuga de información. La métrica elegida es coherente con el problema. La comparación es justa y la elección está bien argumentada. |
| **Interpretación y recomendaciones** | 15% | Se explica qué variables influyen y cómo. Las recomendaciones son concretas, se desprenden de los resultados y reconocen las limitaciones. |
| **Presentación oral** | 15% | Estructura piramidal: la conclusión primero. Gráficos claros, respeta los 10 minutos, todos participan y responden bien las preguntas. |

!!! note "Sobre los sprints"
    Los sprints no suman ni restan nota. Su objetivo es que llegues a diciembre sin sorpresas: en cada revisión recibes un semáforo y comentarios sobre qué ajustar.
