
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface DashboardHeaderProps {
  title: string;
  periodLabel: string;
  recordCount: number;
  cityCount: number;
  yearCount: number;
}

export default function DashboardHeader({
  title,
  periodLabel,
  recordCount,
  cityCount,
  yearCount,
}: DashboardHeaderProps) {

  return (
    <Box component="header">

      <Typography
        variant="overline"
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          letterSpacing: 1.2,
          fontSize: '0.7rem',
        }}
      >
        Observatorio climático · {periodLabel}
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: {
            xs: 'flex-start',
            md: 'flex-end',
            },
        }}
        >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontSize: {
              xs: '1.3rem',
              sm: '1.6rem',
              md: '1.9rem',
            },
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ flexShrink: 0 }}
        >
          {recordCount.toLocaleString('es-EC')} registros
          {' · '}
          {cityCount} ciudades
          {' · '}
          {yearCount} años
        </Typography>

      </Stack>

    </Box>
  );
}
