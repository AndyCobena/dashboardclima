
import { useEffect, useState } from 'react';
import { obtenerClima } from '../services/climaService';
import type { ClimateRecord } from '../types/DashboardTypes';

let pendingRequest: Promise<ClimateRecord[]> | null = null;

function cargarRegistros() {
  if (!pendingRequest) {
    pendingRequest = obtenerClima().finally(() => {
      pendingRequest = null;
    });
  }

  return pendingRequest;
}

export function useClimateData() {
  const [records, setRecords] = useState<ClimateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function cargarDatos() {
      try {
        const datos = await cargarRegistros();

        if (active) {
          setRecords(datos);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los datos climáticos.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void cargarDatos();

    return () => {
      active = false;
    };
  }, []);

  return { records, loading, error };
}
