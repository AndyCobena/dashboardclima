
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({
  message,
}: EmptyStateProps) {

  return (
    <Paper
      role="status"
      elevation={0}
      sx={{
        p: 4,
        minHeight: 180,
        border: 1,
        borderColor: 'divider',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        No se encontraron registros
      </Typography>

      <Typography color="text.secondary">
        {message}
      </Typography>
    </Paper>
  );
}
