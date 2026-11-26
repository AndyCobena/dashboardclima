export type City = "Guayaquil" | "Quito" | "Santa Elena";

export type RainCategory = "Sin lluvia" | "Ligera" | "Moderada" | "Intensa";

export type CityFilterValue = City | "Todas";

export type YearFilterValue = number | "todos";

export type RainFilterValue = RainCategory | "Todas";

export interface ClimateRecord{
    date:string;
    city:City;
    year: number;
    month: number;
    t2m: number;
    t2mMax: number;
    t2mMin: number;
    rh2m: number;
    prectotcorr: number;
    ws10m: number;
    rain: RainCategory;
}

// Opciones de los filtros
export interface FilterOption<T extends string | number> {
    label: string;
    value: T;
  }
  
  // Indicadores KPI
export interface KpiItem {
    title: string;
    value: string | number;
    unit: string;
    detail?: string;
    featured?: boolean;
}
  
  // Temperatura media mensual
export interface MonthlyTemperaturePoint {
    month: number;
    city: City;
    avgTemp: number;
}
  
// Precipitación anual
export interface AnnualPrecipitationPoint {
    year: number;
    city: City;
    precipitationMm: number;
} 

//distribucion de intensidad de lluvida
export interface RainDistributionPoint {
    city: City;
    category: RainCategory;
    count: number;
    percentage: number;
}

//leyendas de los graficos
export interface LegendItem {
    label: string;
    color: string;
}

//columnas de la tabla
export interface ColumnDef {
    field: keyof ClimateRecord;
    label: string;
}


export interface FirebaseClimateRecord {
    YEAR: number;
    DOY: number;
    T2M: number;
    T2M_MAX: number;
    T2M_MIN: number;
    RH2M: number;
    WS10M: number;
    PRECTOTCORR: number;
    CITY: City;
    RAIN: RainCategory;
    DATE: string;
    MONTH: number;
}
  