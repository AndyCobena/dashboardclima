
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({
  message,
}: ErrorStateProps) {

  return (
    <Alert severity="error">
      <AlertTitle>Error al cargar los datos</AlertTitle>
      {message}
    </Alert>
  );
}
