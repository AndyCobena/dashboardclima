
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

import ChartLegend from './ChartLegend';

import type {
  City,
  AnnualPrecipitationPoint,
} from '../../types/DashboardTypes';

interface AnnualPrecipitationBarChartProps {
  data: AnnualPrecipitationPoint[];
  colors: Record<City, string>;
  height: number;
}

export default function AnnualPrecipitationBarChart({
  data,
  colors,
  height,
}: AnnualPrecipitationBarChartProps) {

  const cities = [...new Set(data.map(point => point.city))];

  const years = [...new Set(data.map(point => point.year))]
    .sort((a, b) => a - b);

  const series = cities.map((city) => ({
    id: city,
    label: city,
    color: colors[city],

    data: years.map((year) => {
      const point = data.find(
        (item) =>
          item.city === city &&
          item.year === year
      );

      return point ? point.precipitationMm : null;
    }),
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

      <BarChart
        height={height}
        series={series}
        xAxis={[
          {
            scaleType: 'band',
            data: years.map(String),
          },
        ]}
        yAxis={[
          {
            min: 0,
            valueFormatter: (value: number) => `${value}`,
          },
        ]}
        grid={{ horizontal: true }}
        hideLegend
      />

      <ChartLegend items={legendItems} />

    </Box>
  );
}
