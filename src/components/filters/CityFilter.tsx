import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type {
  CityFilterValue,
} from '../../types/DashboardTypes';

interface CityFilterProps {
  options: CityFilterValue[];
  value: CityFilterValue;
  onChange: (value: CityFilterValue) => void;
}

export default function CityFilter({
  options,
  value,
  onChange,
}: CityFilterProps) {

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'text.secondary',
          lineHeight: 1.5,
        }}
      >
        Ciudad
      </Typography>

      <Box
        role="group"
        aria-label="Filtro de ciudad"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.8,
          mt: 0.5,
        }}
      >
        {options.map((option) => (
          <Button
            key={option}
            variant={
              value === option
                ? 'contained'
                : 'outlined'
            }
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            size="small"
            sx={{
              borderRadius: '24px',
              minWidth: 0,
              px: { xs: 1.2, md: 2 },
              py: 0.7,
              fontSize: '0.75rem',
              borderColor:
                value === option
                  ? 'primary.main'
                  : 'divider',
              whiteSpace: 'nowrap',
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
