
import Box from '@mui/material/Box';

import KpiCard from './KpiCard';
import type { KpiItem } from '../../types/DashboardTypes';

interface KpiGridProps {
  items: KpiItem[];
}

export default function KpiGrid({
  items,
}: KpiGridProps) {

  return (
    <Box
      component="section"
      aria-label="Indicadores climáticos"
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          md: '1.4fr repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {items.map((item, index) => (
        <Box
          key={item.title}
          sx={{
            minWidth: 0,
            gridColumn: {
              xs: index === 0 || index === 3
                ? 'span 2'
                : 'span 1',
              sm: 'span 1',
            },
          }}
        >
          <KpiCard
            title={item.title}
            value={item.value}
            unit={item.unit}
            detail={item.detail}
            featured={item.featured}
          />
        </Box>
      ))}
    </Box>
  );
}
