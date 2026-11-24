
import Button from '@mui/material/Button';

interface ResetFiltersButtonProps {
  onClick: () => void;
}

export default function ResetFiltersButton({
  onClick,
}: ResetFiltersButtonProps) {

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{
        borderColor: 'divider',
        color: 'text.primary',
        fontSize: '0.75rem',
        px: 2,
        py: 0.9,
        whiteSpace: 'nowrap',
      }}
    >
      Restablecer filtros
    </Button>
  );
}
