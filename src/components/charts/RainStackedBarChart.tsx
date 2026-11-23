
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

import ChartLegend from './ChartLegend';

import type {
  RainCategory,
  RainDistributionPoint,
} from '../../types/DashboardTypes';

interface RainStackedBarChartProps {
  data: RainDistributionPoint[];
  colors: Record<RainCategory, string>;
  height: number;
}

const categories: RainCategory[] = [
  'Sin lluvia',
  'Ligera',
  'Moderada',
  'Intensa',
];

export default function RainStackedBarChart({
  data,
  colors,
  height,
}: RainStackedBarChartProps) {

  const cities = [...new Set(data.map(point => point.city))];

  
    const series = categories.map((category) => ({
    id: category,
    label: category,
    color: colors[category],
    stack: 'rain',
  
    data: cities.map((city) => {
      const point = data.find(
        (item) =>
          item.city === city &&
          item.category === category
      );
  
      return point ? point.percentage : 0;
    }),
  
    barLabel: (item: { value: number | null }) =>
      item.value !== null && item.value >= 20
        ? `${Math.round(item.value)}%`
        : null,
  
    valueFormatter: (value: number | null) =>
      value === null
        ? 'Sin datos'
        : `${value.toFixed(1)} %`,
    }));
  

  const legendItems = categories.map((category) => ({
    label: category,
    color: colors[category],
  }));

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" align="center">
        No hay registros para los filtros seleccionados.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>

      <BarChart
        height={height}
        layout="horizontal"
        series={series}
        yAxis={[
          {
            scaleType: 'band',
            data: cities,
            width: 90,
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: 100,
            valueFormatter: (value: number) => `${value}%`,
          },
        ]}

        margin={{ top: 15, right: 20, bottom: 10, left: 5 }}
        hideLegend
      />

      <ChartLegend items={legendItems} />

    </Box>
  );
}
