import { createTheme } from '@mui/material/styles';
import type {
  City,
  RainCategory,
} from '../types/DashboardTypes';

// Colores de las ciudades
export const cityColors: Record<City, string> = {
  Guayaquil: '#B64B20',
  Quito: '#2855CC',
  'Santa Elena': '#147D76',
};

// Colores de las categorías de lluvia
export const rainColors: Record<RainCategory, string> = {
  'Sin lluvia': '#CBD5E1',
  Ligera: '#93C5FD',
  Moderada: '#3B82F6',
  Intensa: '#1E3A8A',
};

// Tema general del dashboard
const theme = createTheme({

  palette: {
    mode: 'light',

    primary: {
      main: '#102E40',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#EDF2F5',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#142B39',
      secondary: '#657580',
    },

    divider: '#DDE5EB',
  },

  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #DDE5EB',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
