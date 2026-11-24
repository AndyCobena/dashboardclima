
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoadingStateProps {
  message: string;
}

export default function LoadingState({
  message,
}: LoadingStateProps) {

  return (
    <Stack
      role="status"
      spacing={2}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        p: 3,
      }}
    >
      <CircularProgress />

      <Typography color="text.secondary">
        {message}
      </Typography>
    </Stack>
  );
}
