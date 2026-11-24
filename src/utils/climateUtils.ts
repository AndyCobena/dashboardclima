import type {
    ClimateRecord,
    CityFilterValue,
    YearFilterValue,
    RainFilterValue,
    RainCategory,
    KpiItem,
    MonthlyTemperaturePoint,
    AnnualPrecipitationPoint,
    RainDistributionPoint,
} from '../types/DashboardTypes';

// Filtrar registros climáticos
export function filterClimateRecords(
    records: ClimateRecord[],
    selectedCity: CityFilterValue,
    selectedYear: YearFilterValue,
    selectedRain: RainFilterValue
): ClimateRecord[] {

    return records.filter((record) => {
        const matchesCity =
            selectedCity === 'Todas' ||
            record.city === selectedCity;

        const matchesYear =
            selectedYear === 'todos' ||
            record.year === selectedYear;

        const matchesRain =
            selectedRain === 'Todas' ||
            record.rain === selectedRain;

        return matchesCity && matchesYear && matchesRain;
    });
}

// Calcular los cuatro indicadores KPI
export function calculateKpis(
    records: ClimateRecord[]
): KpiItem[] {

    if (records.length === 0) return [];

    const averageTemp =
        records.reduce((sum, record) => sum + record.t2m, 0) /
        records.length;

    const totalPrecipitation =
        records.reduce(
            (sum, record) => sum + record.prectotcorr, 0
        );

    const rainyDays = records.filter(
        (record) => record.rain !== 'Sin lluvia'
    ).length;

    const rainyPercentage =
        (rainyDays / records.length) * 100;

    const maxTemp = Math.max(
        ...records.map((record) => record.t2mMax)
    );

    return [
        {
            title: 'Temperatura media',
            value: Number(averageTemp.toFixed(1)),
            unit: '°C',
            detail: 'Promedio de los registros seleccionados',
            featured: true,
        },
        {
            title: 'Precipitación total',
            value: Number(totalPrecipitation.toFixed(1)),
            unit: 'mm',
            detail: 'Precipitación acumulada de los registros',
        },
        {
            title: 'Días con lluvia',
            value: Number(rainyPercentage.toFixed(1)),
            unit: '%',
            detail: `${rainyDays} de ${records.length} registros`,
        },
        {
            title: 'Temperatura máxima',
            value: Number(maxTemp.toFixed(1)),
            unit: '°C',
            detail: 'Máxima temperatura diaria registrada',
        },
    ];
}

// Temperatura media mensual por ciudad
export function getMonthlyTemperature(
    records: ClimateRecord[]
): MonthlyTemperaturePoint[] {

    const result: MonthlyTemperaturePoint[] = [];
    const cities = [...new Set(records.map(r => r.city))];

    for (const city of cities) {
        for (let month = 1; month <= 12; month++) {

            const group = records.filter(
                (record) =>
                    record.city === city &&
                    record.month === month
            );

            if (group.length === 0) continue;

            const average =
                group.reduce((sum, record) => sum + record.t2m, 0) /
                group.length;

            result.push({
                month,
                city,
                avgTemp: Number(average.toFixed(1)),
            });
        }
    }

    return result;
}

// Precipitación anual por ciudad
export function getAnnualPrecipitation(
    records: ClimateRecord[]
): AnnualPrecipitationPoint[] {

    const result: AnnualPrecipitationPoint[] = [];
    const cities = [...new Set(records.map(r => r.city))];
    const years = [...new Set(records.map(r => r.year))]
        .sort((a, b) => a - b);

    for (const city of cities) {
        for (const year of years) {

            const group = records.filter(
                (record) =>
                    record.city === city &&
                    record.year === year
            );

            if (group.length === 0) continue;

            const total = group.reduce(
                (sum, record) => sum + record.prectotcorr, 0
            );

            result.push({
                year,
                city,
                precipitationMm: Number(total.toFixed(1)),
            });
        }
    }

    return result;
}

// Distribución de intensidad de lluvia
export function getRainDistribution(
    records: ClimateRecord[]
): RainDistributionPoint[] {

    const result: RainDistributionPoint[] = [];
    const cities = [...new Set(records.map(r => r.city))];

    const categories: RainCategory[] = [
        'Sin lluvia',
        'Ligera',
        'Moderada',
        'Intensa',
    ];

    for (const city of cities) {

        const cityRecords = records.filter(
            (record) => record.city === city
        );

        for (const category of categories) {

            const count = cityRecords.filter(
                (record) => record.rain === category
            ).length;

            const percentage =
                (count / cityRecords.length) * 100;

            result.push({
                city,
                category,
                count,
                percentage,
            });
        }
    }

    return result;
}
  