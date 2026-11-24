import type {
    City,
    ClimateRecord,
    RainCategory,
} from '../types/DashboardTypes';

// Ciudades disponibles
export const cities: City[] = [
    'Guayaquil',
    'Quito',
    'Santa Elena',
];

// Años disponibles
export const years = [2021, 2022, 2023, 2024, 2025];

// Categorías de lluvia
export const rainCategories: RainCategory[] = [
    'Sin lluvia',
    'Ligera',
    'Moderada',
    'Intensa',
];

// Temperaturas mensuales de ejemplo por ciudad
const temperatures: Record<City, number[]> = {
    Guayaquil: [27.5, 27.1, 26.8, 27.0, 27.3, 27.1,
        27.8, 28.1, 28.3, 28.2, 27.6, 27.8],

    Quito: [17.5, 17.8, 17.7, 18.0, 18.2, 17.6,
        17.8, 18.0, 18.3, 18.1, 17.7, 17.6],

    'Santa Elena': [24.5, 25.8, 26.2, 25.0, 23.8, 22.9,
        22.1, 21.7, 21.6, 21.9, 22.5, 23.7],
};

// Precipitaciones de ejemplo por ciudad (mm)
const precipitation: Record<City, number[]> = {
    Guayaquil: [0.2, 4.5, 12.8, 25.4, 0.6, 2.1, 0, 8.5],
    Quito: [2.5, 8.2, 15.4, 24.6, 0.8, 5.2, 10.5, 6.3],
    'Santa Elena': [0.1, 1.5, 11.2, 21.3, 0, 0.4, 0.8, 3.2],
};

// Clasificación según la intensidad de lluvia
function classifyRain(value: number): RainCategory {
    if (value < 1) return 'Sin lluvia';
    if (value < 10) return 'Ligera';
    if (value < 20) return 'Moderada';

    return 'Intensa';
}

// Generación de registros de ejemplo
export const mockRecords: ClimateRecord[] = [];

for (const city of cities) {
    for (const year of years) {
        for (let month = 1; month <= 12; month++) {
            for (const day of [1, 8, 15, 22]) {

                const temperature = Number(
                    (temperatures[city][month - 1] +
                        (year - 2023) * 0.2 +
                        (day - 12) * 0.03).toFixed(1)
                );

                const rainIndex =
                    (month + year + day) % precipitation[city].length;

                const rainValue = precipitation[city][rainIndex];

                mockRecords.push({
                    date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                    city: city,
                    year: year,
                    month: month,
                    t2m: temperature,
                    t2mMax: Number((temperature + 5.2).toFixed(1)),
                    t2mMin: Number((temperature - 4.3).toFixed(1)),
                    rh2m: 65 + ((month + day) % 25),
                    prectotcorr: rainValue,
                    ws10m: Number((1.5 + month * 0.15).toFixed(1)),
                    rain: classifyRain(rainValue),
                });
            }
        }
    }
}
