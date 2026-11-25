import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardHeader from '../components/layout/DashboardHeader';
import {
  cities,
  years,
  rainCategories,
} from '../data/mockData';
import KpiGrid from '../components/kpis/KpiGrid';
import { 
    calculateKpis, 
    filterClimateRecords,
    getMonthlyTemperature,
    getAnnualPrecipitation,
    getRainDistribution,
} from '../utils/climateUtils';
import { useState } from 'react';
import FilterBar from '../components/filters/FilterBar';
import type {
  CityFilterValue,
  YearFilterValue,
  RainFilterValue,
  ColumnDef,
} from '../types/DashboardTypes';
import ChartCard from '../components/charts/ChartCard';
import ChartsGrid from '../components/charts/ChartsGrid';
import TemperatureLineChart from '../components/charts/TemperatureLineChart';
import { 
    cityColors,
    rainColors, } from '../theme/theme';
import AnnualPrecipitationBarChart from '../components/charts/AnnualPrecipitationBarChart';
import RainStackedBarChart from '../components/charts/RainStackedBarChart';
import DataTable from '../components/records/DataTable';
import RecentRecordsList from '../components/records/RecentRecordsList';
import EmptyState from '../components/feedback/EmptyState';
import { useClimateData } from '../hooks/useClimateData';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';

const tableColumns: ColumnDef[] = [
    { field: 'date', label: 'FECHA' },
    { field: 'city', label: 'CIUDAD' },
    { field: 't2m', label: 'T. MEDIA (°C)' },
    { field: 't2mMax', label: 'MÁX. (°C)' },
    { field: 't2mMin', label: 'MÍN. (°C)' },
    { field: 'rh2m', label: 'HUM. (%)' },
    { field: 'prectotcorr', label: 'PRECIP. (MM)' },
    { field: 'rain', label: 'LLUVIA' },
];

export default function DashboardPage() {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm')
  );

  const { records, loading, error } = useClimateData();

    // Estados de los filtros
    const [selectedCity, setSelectedCity] =
    useState<CityFilterValue>('Todas');

    const [selectedYear, setSelectedYear] =
    useState<YearFilterValue>('todos');

    const [selectedRain, setSelectedRain] =
    useState<RainFilterValue>('Todas');

    const [currentPage, setCurrentPage] = useState<number>(1);

    // Registros según los filtros seleccionados
    const filteredRecords = filterClimateRecords(
    records,
    selectedCity,
    selectedYear,
    selectedRain
    );

    const sortedRecords = [...filteredRecords].sort(
        (a, b) =>
          a.date.localeCompare(b.date) ||
          a.city.localeCompare(b.city)
    );

    const pageSize = isMobile ? 3 : 5;

    const pageCount = Math.max(
        1,
        Math.ceil(sortedRecords.length / pageSize)
    );

    const visiblePage = Math.min(currentPage, pageCount);

    // Indicadores calculados desde los registros filtrados
    const kpis = calculateKpis(filteredRecords);

    const monthlyTemperature =
     getMonthlyTemperature(filteredRecords);

    const annualPrecipitation =
     getAnnualPrecipitation(filteredRecords);

    const rainDistribution =
     getRainDistribution(filteredRecords);

    // Restablecer los filtros
    const handleReset = () => {
    setSelectedCity('Todas');
    setSelectedYear('todos');
    setSelectedRain('Todas');
    setCurrentPage(1);
    };

  return (
    <DashboardLayout isMobile={isMobile}>

      {/* Encabezado */}
      <DashboardHeader
        title="Clima en Guayaquil, Quito y Santa Elena"
        periodLabel="2021–2025"
        recordCount={records.length}
        cityCount={cities.length}
        yearCount={years.length}
      />

      
        {/* Filtros globales */}
        <FilterBar
        selectedCity={selectedCity}
        selectedYear={selectedYear}
        selectedRain={selectedRain}
        cities={['Todas', ...cities]}
        years={['todos', ...years]}
        rainOptions={['Todas', ...rainCategories]}
        
        onCityChange={(value) => {
            setSelectedCity(value);
            setCurrentPage(1);
        }}
        
        onYearChange={(value) => {
            setSelectedYear(value);
            setCurrentPage(1);
        }}
        
        onRainChange={(value) => {
            setSelectedRain(value);
            setCurrentPage(1);
        }}
  
        onReset={handleReset}
        />


    {loading ? (
        <LoadingState message="Cargando datos climáticos..." />
    ) : error ? (
        <ErrorState message={error} />
    ) : filteredRecords.length === 0 ? (
        <EmptyState message="No existen registros para los filtros seleccionados." />
    ) : (
        <>
        {/* Indicadores KPI */}
        <KpiGrid items={kpis} />

      
        {/* Gráficos y registros diarios */}
        <ChartsGrid>

        {/* Temperatura mensual */}
        <Box sx={{ gridArea: 'temperature', minWidth: 0 }}>
        <ChartCard
            title="Temperatura media mensual por ciudad (°C)"
            subtitle="Evolución mensual según los filtros seleccionados"
        >
            <TemperatureLineChart
            data={monthlyTemperature}
            colors={cityColors}
            height={isMobile ? 240 : 260}
            />
        </ChartCard>
        </Box>

        
        {/* Precipitación anual */}
        <Box sx={{ gridArea: 'precipitation', minWidth: 0 }}>
        <ChartCard
            title="Precipitación anual por ciudad (mm)"
            subtitle="Precipitación acumulada de los registros seleccionados"
        >
            <AnnualPrecipitationBarChart
            data={annualPrecipitation}
            colors={cityColors}
            height={isMobile ? 240 : 260}
            />
        </ChartCard>
        </Box>


        
        {/* Intensidad de lluvia */}
        <Box sx={{ gridArea: 'rain', minWidth: 0 }}>
            <ChartCard
                title="Días por intensidad de lluvia (%)"
                subtitle="Distribución porcentual de los registros seleccionados"
            >
                <RainStackedBarChart
                data={rainDistribution}
                colors={rainColors}
                height={isMobile ? 200 : 230}
                />
            </ChartCard>
            </Box>


        {/* Registros diarios */}
        <Box sx={{ gridArea: 'records', minWidth: 0 }}>
        <ChartCard
            title="Registros diarios"
            subtitle="Detalle de cada día según los filtros activos"
        >
            {isMobile ? (
            <RecentRecordsList
                records={sortedRecords}
                page={visiblePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
            ) : (
            <DataTable
                rows={sortedRecords}
                columns={tableColumns}
                page={visiblePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
            )}
        </ChartCard>
        </Box>

        </ChartsGrid>
    </>
    )}            
    </DashboardLayout>
  );
}
