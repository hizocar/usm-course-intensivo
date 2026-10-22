# Guía de Google Colab

[Google Colab](https://colab.research.google.com/) es un entorno de notebooks de Python que corre en el navegador. No necesitas instalar nada: solo una cuenta de Google. Todo el curso, incluido el proyecto, se trabaja aquí.

## 1. Abrir un notebook del curso

1. En la página de [clases](clases/clases.md), haz clic en **Open in Colab**.
2. El notebook se abre en **modo lectura**. Para editarlo, ve a **Archivo › Guardar una copia en Drive**.
3. Tu copia queda en la carpeta *Colab Notebooks* de tu Google Drive.

## 2. Ejecutar código

| Acción | Cómo |
|---|---|
| Ejecutar la celda actual y pasar a la siguiente | ++shift+enter++ |
| Ejecutar todo el notebook | **Entorno de ejecución › Ejecutar todas** |
| Empezar de cero | **Entorno de ejecución › Reiniciar sesión y ejecutar todo** |
| Agregar una celda de código o de texto | Botones **+ Código** y **+ Texto** |

!!! warning "El orden importa"
    Colab recuerda las variables de las celdas que ya ejecutaste, aunque las borres. Si algo funciona "a veces", reinicia la sesión y ejecuta todo de arriba hacia abajo.

## 3. Cargar datos

La forma recomendada en este curso es **leer el archivo directo desde su URL**. Funciona igual para todos y no depende de tu Drive:

```python
import pandas as pd

url = "https://raw.githubusercontent.com/hizocar/usm-course-intensivo/main/docs/datasets/loan_default.csv"
df = pd.read_csv(url)
df.head()
```

Las URLs de cada archivo están en la página de [datasets](datasets/datasets.md). Otras dos opciones:

=== "Subir un archivo"

    ```python
    from google.colab import files
    subido = files.upload()   # abre un selector de archivos
    df = pd.read_csv("nombre_del_archivo.csv")
    ```

    El archivo se borra cuando se cierra la sesión de Colab.

=== "Leer desde tu Google Drive"

    ```python
    from google.colab import drive
    drive.mount("/content/drive")
    df = pd.read_csv("/content/drive/MyDrive/carpeta/archivo.csv")
    ```

    Cada integrante del equipo tendría que tener el archivo en la misma ruta, así que para el proyecto es mejor usar la URL.

## 4. Librerías

Colab ya trae pandas, NumPy, matplotlib, seaborn, scikit-learn y statsmodels. Si te falta alguna, instálala en una celda:

```python
!pip install xgboost
```

## 5. Trabajar en equipo y compartir el proyecto

1. Una persona del equipo crea el notebook del proyecto y lo comparte con el resto con permiso de **Editor** (botón **Compartir**, arriba a la derecha).
2. Compártelo también con **hizocar@gmail.com** con permiso de **Comentarista**. Así reviso el avance en cada sprint sin que tengan que enviar nada.
3. Colab permite que varias personas abran el mismo notebook, pero si dos editan a la vez pueden pisarse cambios. Repártanse secciones y avisen antes de ejecutar todo.

## 6. Antes de la entrega final

- [ ] **Entorno de ejecución › Reiniciar sesión y ejecutar todo** termina sin errores.
- [ ] Los datos se leen desde una URL, no desde una ruta de tu computador o tu Drive.
- [ ] Cada sección tiene un título y un texto que explica qué se hizo y qué se concluye.
- [ ] Descargaste el archivo con **Archivo › Descargar › Descargar .ipynb**.
