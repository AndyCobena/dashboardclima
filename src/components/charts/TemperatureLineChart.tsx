
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

import ChartLegend from './ChartLegend';

import type {
  City,
  MonthlyTemperaturePoint,
} from '../../types/DashboardTypes';

interface TemperatureLineChartProps {
  data: MonthlyTemperaturePoint[];
  colors: Record<City, string>;
  height: number;
}

const months = [
  'Ene', 'Feb', 'Mar', 'Abr',
  'May', 'Jun', 'Jul', 'Ago',
  'Sep', 'Oct', 'Nov', 'Dic',
];

export default function TemperatureLineChart({
  data,
  colors,
  height,
}: TemperatureLineChartProps) {

  const cities = [...new Set(data.map(point => point.city))];

  const series = cities.map((city) => ({
    id: city,
    label: city,
    color: colors[city],

    data: months.map((_, index) => {
      const point = data.find(
        (item) =>
          item.city === city &&
          item.month === index + 1
      );

      return point ? point.avgTemp : null;
    }),

    showMark: true,
  }));

  const legendItems = cities.map((city) => ({
    label: city,
    color: colors[city],
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

      <LineChart
        height={height}
        series={series}
        xAxis={[
          {
            scaleType: 'point',
            data: months,
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value: number) => `${value} °C`,
          },
        ]}
        grid={{ horizontal: true }}
        hideLegend
      />

      <ChartLegend items={legendItems} />

    </Box>
  );
}
