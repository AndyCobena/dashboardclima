
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  pageCount,
  onPageChange,
}: PaginationControlsProps) {

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        sx={{
          flex: 1,
          borderColor: 'divider',
          fontSize: '0.75rem',
        }}
      >
        Anterior
      </Button>

      <Button
        variant="outlined"
        size="small"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        sx={{
          flex: 1,
          borderColor: 'divider',
          fontSize: '0.75rem',
        }}
      >
        Siguiente
      </Button>
    </Box>
  );
}
