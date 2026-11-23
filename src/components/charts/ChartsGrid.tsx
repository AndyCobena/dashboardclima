
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface ChartsGridProps {
  children: ReactNode;
}

export default function ChartsGrid({
  children,
}: ChartsGridProps) {

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,

        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          md: 'repeat(12, minmax(0, 1fr))',
        },

        gridTemplateAreas: {
          xs: `
            "temperature"
            "rain"
            "precipitation"
            "records"
          `,

          md: `
            "temperature temperature temperature temperature temperature temperature temperature precipitation precipitation precipitation precipitation precipitation"
            "rain rain rain rain records records records records records records records records"
          `,
        },
      }}
    >
      {children}
    </Box>
  );
}
