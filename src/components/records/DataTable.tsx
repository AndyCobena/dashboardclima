
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import {
  DataGrid,
  type GridColDef,
} from '@mui/x-data-grid';

import PaginationControls from './PaginationControls';

import { rainColors } from '../../theme/theme';

import type {
  ClimateRecord,
  ColumnDef,
} from '../../types/DashboardTypes';

interface DataTableProps {
  rows: ClimateRecord[];
  columns: ColumnDef[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Identificador único de cada registro
function getRecordId(record: ClimateRecord) {
  return `${record.city}-${record.date}`;
}

export default function DataTable({
  rows,
  columns,
  page,
  pageSize,
  onPageChange,
}: DataTableProps) {

  // Cálculo de la paginación
  const pageCount = Math.ceil(rows.length / pageSize);

  const start = (page - 1) * pageSize;

  const end = Math.min(start + pageSize, rows.length);

  const visibleRows = rows.slice(start, end);

  // Adaptación de las columnas a MUI X
  const gridColumns: GridColDef<ClimateRecord>[] =
    columns.map((column) => ({

      field: column.field,
      headerName: column.label,

      flex: 1,

      minWidth:
        column.field === 'date' ? 100 :
        column.field === 'city' ? 100 :
        column.field === 'rain' ? 100 : 75,

      sortable: false,

      renderCell: (params) => {

        if (column.field === 'rain') {

          const category = params.row.rain;

          return (
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: rainColors[category],
                color:
                  category === 'Intensa'
                    ? '#FFFFFF'
                    : '#142B39',
                fontSize: '0.65rem',
                fontWeight: 600,
                height: 22,
              }}
            />
          );
        }

        const value = params.row[column.field];

        if (typeof value === 'number') {
          return value.toLocaleString('es-EC', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          });
        }

        return value;
      },
    }));

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>

      <Box sx={{ height: 270, width: '100%' }}>

        <DataGrid
          rows={visibleRows}
          columns={gridColumns}
          getRowId={getRecordId}
          rowHeight={40}
          columnHeaderHeight={42}
          hideFooter
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: 'No hay registros disponibles',
          }}
          sx={{
            border: 'none',
            fontSize: '0.75rem',

            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.7rem',
              color: 'text.secondary',
            },

            '& .MuiDataGrid-cell': {
              borderColor: 'divider',
            },
          }}
        />

      </Box>

      {/* Información y controles de paginación */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Mostrando {rows.length === 0 ? 0 : start + 1}
          {'–'}
          {end} de {rows.length.toLocaleString('es-EC')}
          {' registros'}
        </Typography>

        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />

      </Box>

    </Box>
  );
}
