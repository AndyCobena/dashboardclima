
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type {
  LegendItem,
} from '../../types/DashboardTypes';

interface ChartLegendProps {
  items: LegendItem[];
}

export default function ChartLegend({
  items,
}: ChartLegendProps) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5,
        mt: 1,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 9,
              height: 9,
              borderRadius: '3px',
              bgcolor: item.color,
              flexShrink: 0,
            }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
