
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import CityFilter from './CityFilter';
import SelectFilter from './SelectFilter';
import ResetFiltersButton from './ResetFiltersButton';

import type {
  CityFilterValue,
  YearFilterValue,
  RainFilterValue,
} from '../../types/DashboardTypes';

interface FilterBarProps {
  selectedCity: CityFilterValue;
  selectedYear: YearFilterValue;
  selectedRain: RainFilterValue;

  cities: CityFilterValue[];
  years: YearFilterValue[];
  rainOptions: RainFilterValue[];

  onCityChange: (value: CityFilterValue) => void;
  onYearChange: (value: YearFilterValue) => void;
  onRainChange: (value: RainFilterValue) => void;

  onReset: () => void;
}

export default function FilterBar({
  selectedCity,
  selectedYear,
  selectedRain,
  cities,
  years,
  rainOptions,
  onCityChange,
  onYearChange,
  onRainChange,
  onReset,
}: FilterBarProps) {

  return (
    <Paper
      component="section"
      aria-label="Filtros globales"
      elevation={0}
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider',
        display: 'grid',
        gap: 2,
        alignItems: 'end',
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          md: 'auto minmax(0, 1fr) auto',
        },
      }}
    >
      {/* Filtro de ciudad */}
      <CityFilter
        options={cities}
        value={selectedCity}
        onChange={onCityChange}
      />

      {/* Filtros de año y lluvia */}
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns:
            'repeat(2, minmax(0, 1fr))',
          maxWidth: {
            xs: '100%',
            md: 420,
          },
        }}
      >
        <SelectFilter
          label="Año"
          value={selectedYear}
          options={years.map((year) => ({
            label:
              year === 'todos'
                ? '2021–2025 (todos)'
                : String(year),
            value: year,
          }))}
          onChange={onYearChange}
        />

        <SelectFilter
          label="Intensidad de lluvia"
          value={selectedRain}
          options={rainOptions.map((rain) => ({
            label: rain,
            value: rain,
          }))}
          onChange={onRainChange}
        />
      </Box>

      {/* Restablecer filtros */}
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          justifyContent: 'flex-end',
        }}
      >
        <ResetFiltersButton onClick={onReset} />
      </Box>
    </Paper>
  );
}
