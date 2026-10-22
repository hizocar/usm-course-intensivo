# Sprints

Los sprints dividen el proyecto en etapas que siguen el contenido del curso. **No llevan nota**: sirven para monitorear el avance y darte retroalimentación a tiempo.

## Cómo funcionan

- Desde el Sprint 1, el notebook del proyecto está compartido con **hizocar@gmail.com** (permiso de comentarista). No hay que enviar nada en cada sprint: reviso la versión que está en Colab.
- La revisión se hace durante el **taller** de la sesión indicada. Cada equipo recibe un semáforo:

| Semáforo | Significa |
|---|---|
| 🟢 **Verde** | Al día. Sigue así. |
| 🟡 **Amarillo** | Hay algo que ajustar antes del siguiente sprint. Revisa los comentarios en el notebook. |
| 🔴 **Rojo** | Hay un problema que puede afectar la entrega final. Conversemos en el mismo taller. |

| Sprint | Contenido que aplica | Se lanza en | Se revisa en |
|---|---|---|---|
| [1 · Datos en Colab](#sprint-1-datos-en-colab) | Sesión 1: Python y Colab | Sesión 1 | Sesión 2 (4 y 6 nov) |
| [2 · Limpieza y análisis exploratorio](#sprint-2-limpieza-y-analisis-exploratorio) | Sesión 2: pandas y seaborn | Sesión 2 | Sesión 3 (11 y 13 nov) |
| [3 · Primer modelo](#sprint-3-primer-modelo) | Sesiones 3 y 4: regresión y clasificación | Sesión 3 | Sesión 5 (25 y 27 nov) |
| Entrega final | Sesión 5: árboles y comunicación | Sesión 5 | 1 dic (entrega), 2 y 4 dic (presentación) |

---

## Sprint 1 · Datos en Colab

*Se trabaja en el taller de la sesión 1. Se revisa en la sesión 2.*

- [ ] Equipo inscrito (2 o 3 integrantes) y caso elegido. Si es un caso propio, con la propuesta escrita para aprobación.
- [ ] Notebook creado en Colab y compartido con todo el equipo y con hizocar@gmail.com.
- [ ] Los datos se cargan desde una URL con `pd.read_csv`.
- [ ] Primera inspección: `shape`, tipos de datos, primeras filas, cantidad de valores faltantes y de duplicados.
- [ ] La pregunta de negocio del caso escrita con tus palabras en dos o tres líneas.

---

## Sprint 2 · Limpieza y análisis exploratorio

*Se trabaja en el taller de la sesión 2. Se revisa en la sesión 3.*

- [ ] Duplicados eliminados y valores faltantes tratados, con la decisión justificada.
- [ ] Categorías inconsistentes unificadas (por ejemplo, `"bachelor"`, `"Bachelor"` y `"BACHELOR"`).
- [ ] Valores imposibles detectados (edades negativas, puntajes fuera de rango) y corregidos.
- [ ] Tabla resumen de la limpieza: problema, decisión y filas afectadas.
- [ ] Al menos cuatro gráficos exploratorios, incluida la relación de las variables con la variable objetivo.
- [ ] Tres hallazgos escritos, cada uno con su implicancia para el negocio.

---

## Sprint 3 · Primer modelo

*Se lanza en la sesión 3 y se trabaja también en la clínica de la sesión 4. Se revisa en la sesión 5.*

- [ ] Variables categóricas codificadas (por ejemplo, con `pd.get_dummies`).
- [ ] Datos separados en entrenamiento y prueba **antes** de entrenar.
- [ ] Modelo base entrenado: regresión lineal (caso A) o regresión logística (caso B).
- [ ] Métricas calculadas sobre los datos de prueba y elegidas según el problema.
- [ ] Interpretación de al menos dos coeficientes en lenguaje de negocio.

---

## Entrega final

*Se trabaja en el taller de la sesión 5.*

- [ ] Segundo modelo (árbol de decisión o Random Forest) entrenado y evaluado con la misma partición.
- [ ] Tabla comparativa de modelos y elección justificada.
- [ ] Importancia de las variables del modelo elegido.
- [ ] Tres recomendaciones y las limitaciones del análisis.
- [ ] Presentación de 10 minutos con estructura piramidal.
- [ ] Checklist de la [guía de Colab](../colab.md#6-antes-de-la-entrega-final) completo.

Todos los detalles de la entrega y la rúbrica están en el [enunciado del proyecto](proyecto.md).
