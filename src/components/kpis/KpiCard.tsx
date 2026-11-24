import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { KpiItem } from '../../types/DashboardTypes';

export default function KpiCard({
  title,
  value,
  unit,
  detail,
  featured = false,
}: KpiItem) {

  const formattedValue =
    typeof value === 'number'
      ? value.toLocaleString('es-EC', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : value;

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: 110,
        bgcolor: featured
          ? 'primary.main'
          : 'background.paper',
        color: featured
          ? 'primary.contrastText'
          : 'text.primary',
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
          variant="overline"
          sx={{
            display: 'block',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: 0.6,
            lineHeight: 1.5,
            color: featured
              ? '#B5C8D4'
              : 'text.secondary',
          }}
        >
          {title}
        </Typography>

        <Typography
          component="p"
          variant="h4"
          sx={{
            fontSize: featured
              ? { xs: '1.9rem', md: '2.4rem' }
              : { xs: '1.4rem', md: '1.9rem' },
            fontWeight: 700,
            my: 0.5,
            overflowWrap: 'anywhere',
          }}
        >
          {formattedValue} {unit}
        </Typography>

        {detail && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: featured
                ? '#B5C8D4'
                : 'text.secondary',
            }}
          >
            {detail}
          </Typography>
        )}

      </CardContent>
    </Card>
  );
}
