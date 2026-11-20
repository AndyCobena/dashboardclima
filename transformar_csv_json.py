import csv
import json
from datetime import date
from pathlib import Path

carpeta = Path(__file__).parent
archivo_csv = carpeta / "clima-guayaquil-quito-santaelena.csv"
archivo_json = carpeta / "clima-guayaquil-quito-santaelena.json"

enteros = ["YEAR", "DOY", "MONTH"]
decimales = ["T2M", "T2M_MAX", "T2M_MIN", "RH2M", "WS10M", "PRECTOTCORR"]
registros = []

with archivo_csv.open("r", encoding="utf-8-sig", newline="") as archivo:
    lector = csv.DictReader(archivo)
    for numero, fila in enumerate(lector, start=2):
        fila = {clave: valor.strip() for clave, valor in fila.items()}

        if any(valor == "" for valor in fila.values()):
            raise ValueError(f"Hay un valor vacío en la línea {numero}")

        for columna in enteros:
            fila[columna] = int(fila[columna])
        for columna in decimales:
            fila[columna] = float(fila[columna])

        fecha = date.fromisoformat(fila["DATE"])
        if (fecha.year != fila["YEAR"] or fecha.month != fila["MONTH"]
                or fecha.timetuple().tm_yday != fila["DOY"]):
            raise ValueError(f"Fecha inconsistente en la línea {numero}")

        registros.append(fila)

with archivo_json.open("w", encoding="utf-8") as archivo:
    json.dump(registros, archivo, ensure_ascii=False, indent=2, allow_nan=False)

with archivo_json.open("r", encoding="utf-8") as archivo:
    verificados = json.load(archivo)

assert len(verificados) == len(registros), "No coincide la cantidad de registros"
print(f"Conversión exitosa: {len(verificados)} registros guardados en {archivo_json.name}")
