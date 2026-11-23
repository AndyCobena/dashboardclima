
import type { ReactNode } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ChartCard({
  title,
  subtitle,
  children,
}: ChartCardProps) {

  return (
    <Card
      component="section"
      sx={{
        height: '100%',
        minWidth: 0,
      }}
    >
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mb: 1,
          }}
        >
          {subtitle}
        </Typography>

        {children}

      </CardContent>
    </Card>
  );
}
