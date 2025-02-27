import { calcularFecha } from "./ageUtils.js";


// Esquema de vacunación
/*
1. Menos de un anio
[0 - 1] meses -> BCG, HvB
[2 - 3] meses -> Rotavirus, Antineumocócica, Penta, IPV 
[4 - 5] meses -> Rotavirus, Antineumococica, Penta 2º , IPV  
[6 - 6] meses -> Penta 3º, IPV, Influenza Ped. 
[7 - 11] meses -> Influenza Ped.  

2. 1anio
[12 - 14] meses -> Neumococo, Influenza Ped. ,SPR 1º dosis, Varicela 
[15 - 17] meses ->  AMA, Hepatitis "A" 
[18 - 23] meses -> IPV(2024), APO 1º erf., SPR 2º dosis, DPT 1º ref. 

3. 2anios en adelante
[2 - 3] anios -> IPV(2024), APO 1º erf., SPR 2º dosis, DPT 1º ref. 
[4 - 8] anios -> Influenza Adul., Apo 2º ref. (2023), DPT 2° ref. 
[9 - 13] anios -> VPH
60 - mas anios -> Influenza, Neumococo
*/
export const esquemaVacunacion = [
  { maxAnios: 0, minMeses: 0, maxMeses: 1, vacunas: ["BCG", "HvB"] },
  { maxAnios: 0, minMeses: 2, maxMeses: 3, vacunas: ["Rotavirus", "Antineumocócica", "Penta", "IPV"] },
  { maxAnios: 0, minMeses: 4, maxMeses: 5, vacunas: ["Rotavirus", "Antineumococica", "Penta 2º", "IPV"] },
  { maxAnios: 0, minMeses: 6, maxMeses: 6, vacunas: ["Penta 3º", "IPV", "Influenza Ped."] },
  { maxAnios: 0, minMeses: 7, maxMeses: 11, vacunas: ["Influenza Ped."] },
  { maxAnios: 1, minMeses: 0, maxMeses: 2, vacunas: ["Neumococo", "Influenza Ped.", "SPR 1º dosis", "Varicela"] },
  { maxAnios: 1, minMeses: 3, maxMeses: 5, vacunas: ["AMA", "Hepatitis A"] },
  { maxAnios: 1, minMeses: 6, maxMeses: 11, vacunas: ["IPV(2024)", "APO 1º ref.", "SPR 2º dosis", "DPT 1º ref."] },
  { minAnios: 2, maxAnios: 3, minMeses: 0, maxMeses: 11, vacunas: ["IPV(2024)", "APO 1º ref.", "SPR 2º dosis", "DPT 1º ref."] },
  { minAnios: 4, maxAnios: 8, minMeses: 0, maxMeses: 11, vacunas: ["Influenza Adul.", "APO 2º ref. (2023)", "DPT 2° ref."] },
  { minAnios: 9, maxAnios: 13, minMeses: 0, maxMeses: 11, vacunas: ["VPH"] },
  { minAnios: 60, maxAnios: Infinity, minMeses: 0, maxMeses: 11, vacunas: ["Influenza", "Neumococo"] }
];

// Función para determinar vacunas y fechas
export const determinarVacunasYFechas = (edad, fechaNacimiento) => {
  const esquema = esquemaVacunacion.find(({ minAnios = 0, maxAnios = Infinity, minMeses = 0, maxMeses = 11 }) =>
    edad.anios >= minAnios && edad.anios <= maxAnios && edad.meses >= minMeses && edad.meses <= maxMeses
  );

  if (!esquema) return { vacunas: [], fechaInicio: null, fechaFin: null };

  const fechaInicio = calcularFecha(fechaNacimiento, esquema.minAnios || 0, esquema.minMeses || 0);
  const fechaFin = calcularFecha(fechaNacimiento, esquema.maxAnios || 0, esquema.maxMeses || 0);

  return { vacunas: esquema.vacunas, fechaInicio, fechaFin };
};
