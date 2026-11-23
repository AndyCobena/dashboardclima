
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import PaginationControls from './PaginationControls';

import { rainColors } from '../../theme/theme';

import type {
  ClimateRecord,
} from '../../types/DashboardTypes';

interface RecentRecordsListProps {
  records: ClimateRecord[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Formato de los valores numéricos
function formatNumber(value: number): string {
  return value.toLocaleString('es-EC', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function RecentRecordsList({
  records,
  page,
  pageSize,
  onPageChange,
}: RecentRecordsListProps) {

  const pageCount = Math.ceil(
    records.length / pageSize
  );

  const start = (page - 1) * pageSize;

  const end = Math.min(
    start + pageSize,
    records.length
  );

  const visibleRecords = records.slice(start, end);

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>

      {visibleRecords.length === 0 && (
        <Typography
          color="text.secondary"
          align="center"
          sx={{ py: 3 }}
        >
          No hay registros disponibles.
        </Typography>
      )}

      {visibleRecords.map((record) => (
        <Box
          key={`${record.city}-${record.date}`}
          component="article"
          sx={{
            py: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >

          {/* Fecha, ciudad e intensidad de lluvia */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 700 }}
            >
              {record.date} · {record.city}
            </Typography>

            <Chip
              label={record.rain}
              size="small"
              sx={{
                bgcolor: rainColors[record.rain],
                color:
                  record.rain === 'Intensa'
                    ? '#FFFFFF'
                    : '#142B39',
                fontSize: '0.65rem',
                fontWeight: 600,
                height: 22,
                flexShrink: 0,
              }}
            />
          </Box>

          {/* Temperatura media */}
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontWeight: 700,
              fontSize: '1.4rem',
              my: 0.5,
            }}
          >
            {formatNumber(record.t2m)} °C
          </Typography>

          {/* Temperaturas máxima y mínima */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Máx. {formatNumber(record.t2mMax)} °C
            {' · '}
            Mín. {formatNumber(record.t2mMin)} °C
          </Typography>

          {/* Humedad y precipitación */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Humedad: {formatNumber(record.rh2m)} %
            {' · '}
            Precip.: {formatNumber(record.prectotcorr)} mm
          </Typography>

        </Box>
      ))}

      {/* Información de paginación */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'block',
          mt: 2,
          mb: 1,
        }}
      >
        Mostrando {records.length === 0 ? 0 : start + 1}
        {'–'}
        {end} de {records.length.toLocaleString('es-EC')}
        {' registros'}
      </Typography>

      {/* Controles reutilizables */}
      <PaginationControls
        page={page}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />

    </Box>
  );
}
