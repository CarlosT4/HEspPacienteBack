import { calcularFecha } from "./ageUtils.js";


// Esquema de vacunación
/*
AMA:
13-14 anios hepatitis b (HvB), dipteria tetanos (DT ADULTO)

3 dosis 
(al primer contacto, 2 meses, 4 meses ) protegido por 10 anios

VARICELA 
HEPATITIS 

1. Menos de un anio
[0 - 1] meses -> BCG (tuberculosis), HvB (hepatitis b)
[2 - 3] meses -> Rotavirus, Antineumocócica, Penta, IPV 
[4 - 5] meses -> Rotavirus, Antineumococica, Penta 2º (Pentavalente), IPV  
[6 - 6] meses -> Penta 3º, IPV, Influenza Ped. 
[7 - 11] meses -> Influenza Ped.  

2. 1anio
[12 - 14] meses -> Neumococo, Influenza Ped. ,SPR 1º dosis, Varicela 
[15 - 17] meses ->  AMA (fiebre amarilla), Hepatitis "A" 
[18 - 23] meses -> IPV(2024) (poliomielitits), SPR 2º dosis (sarampion), DPT 1º ref. 

3. 2anios en adelante
[2 - 3] anios -> IPV(2024), ., SPR 2º dosis, DPT 1º ref. 
[4 - 8] anios -> Influenza Adul., Apo 2º ref poliomielitits. (2023), DPT 2° ref. (dipteria - tos convulsiva) 
[9 - 13] anios -> VPH
60 - mas anios -> Influenza, Neumococo
*/
export const esquemaVacunacion = [
  { maxAnios: 0, minMeses: 0, maxMeses: 1, vacunas: ["BCG (Tuberculosis)", "HvB (Hepatitis b)"] },
  { maxAnios: 0, minMeses: 2, maxMeses: 3, vacunas: ["Rotavirus", "Antineumocócica", "Pentavalente", "IPV (Poliomielitis)"] },
  { maxAnios: 0, minMeses: 4, maxMeses: 5, vacunas: ["Rotavirus", "Antineumococica", "Pentavalente 2º", "IPV (Poliomielitis)"] },
  { maxAnios: 0, minMeses: 6, maxMeses: 6, vacunas: ["Pentavalente 3º", "IPV (Poliomielitis)", "Influenza Ped."] },
  { maxAnios: 0, minMeses: 7, maxMeses: 11, vacunas: ["Influenza Ped."] },
  { maxAnios: 1, minMeses: 0, maxMeses: 2, vacunas: ["Neumococo", "Influenza Ped.", "SPR (sarampion) 1º dosis", "Varicela"] },
  { maxAnios: 1, minMeses: 3, maxMeses: 5, vacunas: ["AMA (fiebre amarilla)", "Hepatitis A"] },
  { maxAnios: 1, minMeses: 6, maxMeses: 11, vacunas: ["IPV (Poliomielitis)", "APO (Poliomielitits) 1º ref.", "SPR (sarampion) 2º dosis", "DPT (difteria, tétanos y tos ferina) 1º ref."] },
  { minAnios: 2, maxAnios: 3, minMeses: 0, maxMeses: 11, vacunas: ["IPV (Poliomielitis)", "APO (Poliomielitits) 1º ref.", "SPR (sarampion) 2º dosis", "DPT (difteria, tétanos y tos ferina) 1º ref."] },
  { minAnios: 4, maxAnios: 8, minMeses: 0, maxMeses: 11, vacunas: ["Influenza Adul.", "APO (Poliomielitits) 2º ref. (2023)", "DPT (difteria, tétanos y tos ferina) 2° ref."] },
  { minAnios: 9, maxAnios: 13, minMeses: 0, maxMeses: 11, vacunas: ["VPH"] },
  { minAnios: 14, maxAnios: 18, minMeses: 0, maxMeses: 11, vacunas: ["VPH"] },
  { minAnios: 60, maxAnios: Infinity, minMeses: 0, maxMeses: 11, vacunas: ["Influenza", "Neumococo"] }
];

// Función para determinar vacunas y fechas
export const determinarVacunasYFechas = (edad, fechaNacimiento) => {
  const esquema = esquemaVacunacion.find(({ minAnios = 0, maxAnios = Infinity, minMeses = 0, maxMeses = 11 }) =>
    edad.anios >= minAnios && edad.anios <= maxAnios && edad.meses >= minMeses && edad.meses <= maxMeses
  );

  if (!esquema) return { vacunas: [], fechaInicio: null, fechaFin: null };

  const fechaInicio = calcularFecha(fechaNacimiento, esquema.minAnios || 0, esquema.minMeses || 0);
  let fechaFin = calcularFecha(fechaNacimiento, esquema.maxAnios || 0, (esquema.maxMeses || 0) + 1, -1);

  return { vacunas: esquema.vacunas, fechaInicio, fechaFin };
};
