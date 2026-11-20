# Sprint 1: Transformación de datos CSV a JSON

Proyecto 03 — Dashboard del clima (Guayaquil, Quito y Santa Elena).

## Archivos
- `clima-guayaquil-quito-santaelena.csv`: dataset original.
- `transformar_csv_json.py`: script de conversión y validación.
- `clima-guayaquil-quito-santaelena.json`: resultado generado.

## Requisitos
Python 3.8 o superior. No se necesitan paquetes externos.

## Ejecución
Abre una terminal en esta carpeta y ejecuta:

```bash
python transformar_csv_json.py
```

En algunos sistemas el comando es `python3 transformar_csv_json.py`.

## Procedimiento
1. Se lee el CSV utilizando `csv.DictReader` y codificación UTF-8.
2. Se eliminan espacios al inicio y final de los valores y se comprueban los campos vacíos.
3. Se convierten `YEAR`, `DOY` y `MONTH` a enteros y las seis variables meteorológicas a decimales.
4. Se valida el formato de `DATE` (`AAAA-MM-DD`) y su coherencia con año, mes y día del año. `CITY` y `RAIN` permanecen como texto.
5. Se escribe un arreglo de objetos JSON y se vuelve a cargar para verificar su sintaxis y cantidad de registros.

Los 12 nombres de columnas y todos los registros del CSV se conservan. El script detiene la conversión con un error si encuentra valores faltantes o fechas inconsistentes, en vez de modificar datos silenciosamente.

## Evidencia para el reporte
Agregar una captura del JSON abierto en un editor, mostrando los primeros objetos, y otra de la terminal con el mensaje de conversión exitosa. Registrar además la URL del repositorio y el SHA del commit después de subir los archivos a GitHub.
