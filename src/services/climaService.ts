
import { ref, get } from 'firebase/database';
import { database } from '../firebase/firebase';
import type {
  ClimateRecord,
  FirebaseClimateRecord,
} from '../types/DashboardTypes';

export async function obtenerClima(
  ruta: string = 'clima'
): Promise<ClimateRecord[]> {
  const referencia = ref(database, ruta);
  const snapshot = await get(referencia);

  if (!snapshot.exists()) {
    return [];
  }

  const datos = snapshot.val() as Record<
    string,
    FirebaseClimateRecord
  >;

  return Object.values(datos).map((registro) => ({
    date: registro.DATE,
    city: registro.CITY,
    year: registro.YEAR,
    month: registro.MONTH,
    t2m: registro.T2M,
    t2mMax: registro.T2M_MAX,
    t2mMin: registro.T2M_MIN,
    rh2m: registro.RH2M,
    prectotcorr: registro.PRECTOTCORR,
    ws10m: registro.WS10M,
    rain: registro.RAIN,
  }));
}
