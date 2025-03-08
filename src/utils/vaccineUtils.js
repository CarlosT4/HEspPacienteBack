import { calcularFecha } from "./ageUtils.js";


// Esquema de vacunación
/*
AMA:
13-14 anios hepatitis b (HvB), dipteria tetanos (DT ADULTO)

3 dosis 
(al primer contacto, 2 meses, 4 meses ) protegido por 10 anios

VARICELA 
HEPATITIS 

----Menos de un anio
[0 - 1] meses -> DOSIS UNICA BCG (tuberculosis), DOSIS UNICA HvB (hepatitis b)
[2 - 3] meses -> 1RA DOSIS Penta, 1RA DOSIS IPV, 1RA DOSIS Rotavirus, 1RA DOSIS Antineumocócica 
[4 - 5] meses -> 2DA DOSIS Penta, 2DA DOSIS IPV, 2DA DOSIS Rotavirus, 2DA DOSIS Antineumococica 
[6 - 6] meses -> 3RA DOSIS Penta, 3RA DOSIS IPV, 1RA DOSIS Influenza Pediatrica 
[7 - 11] meses -> 2DA DOSIS Influenza Pediatrica

----1anio
[12 - 14] meses -> 1RA DOSIS SPR, 3RA DOSIS Antineumococica , DOSIS UNICA Varicela, DOSIS ANUAL Influenza Ped.  
[15 - 17] meses -> DOSIS UNICA AMA (fiebre amarilla), DOSIS UNICA  Hepatitis A 
[18 - 23] meses -> 1RA DOSIS DE REFUERZO IPV, 1RA DOSIS DE REFUERZO DPT, 2DA DOSIS SRP

---2anios en adelante
[2 - 3] anios -> 1RA DOSIS DE REFUERZO IPV, 1RA DOSIS DE REFUERZO DPT, 2DA DOSIS SRP, DOSIS ANUAL Influenza Ped. 
[4 - 8] anios -> DOSIS ANUAL Influenza Ped., 2DA DOSIS DE REFUERZO DPT (dipteria - tos convulsiva), 2DA DOSIS DE REFUERZO APO (poliomielitits), 
[9 - 13] anios -> VPH UNA DOSIS 
[14 - 18] anios -> VPH UNA DOSIS SI NO SE APLICO ANTES
[19 - 59] anios -> Vacuna antiamarílica, Hepatitis B, Influenza adulto
60 - mas anios -> DOSIS ANUAL Influenza, DOSIS UNICA Antineumococica

- Recién nacidos (OK)
[0 - 1] meses
Dosis única de la vacuna contra el bacilo de Calmette-Guérin (BCG): contra las formas graves de tuberculosis (TB).
Dosis única de la vacuna contra el virus de Hepatitis B (HVB): contra la hepatitis B.

[2 - 3] meses
Primera dosis de la vacuna pentavalente (DPT - HvB - Hib): vacuna combinada de 5 componentes que previene la difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B.
Primera dosis de la vacuna antipolio inactivada inyectable (IPV): vacuna contra la parálisis flácida aguda.
Primera dosis de la vacuna contra el rotavirus: vacuna que previene las diarreas por rotavirus.
Primera dosis de la vacuna antineumocócica: vacuna que protege contra la neumonía, meningitis y otitis media.

[4 - 5] meses
Segunda dosis de la vacuna pentavalente (DPT - HvB - Hib): vacuna combinada de 5 componentes que previene la difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B.
Segunda dosis de la vacuna antipolio inactivada inyectable (IPV): vacuna contra la parálisis flácida aguda.
Segunda dosis de la vacuna contra el rotavirus: vacuna que previene las diarreas por rotavirus.
Segunda dosis de la vacuna antineumocócica: vacuna que protege contra la neumonía, meningitis y otitis media.

[6 - 6] meses
Tercera dosis de la vacuna pentavalente (DPT - HvB - Hib): vacuna combinada de 5 componentes que previene la difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B.
Tercera dosis de la vacuna antipolio oral (IPV): protección contra la parálisis flácida aguda.
Primera dosis de la vacuna contra la influenza pediátrica: vacuna contra la gripe y bronquitis.

[7 - 11] meses
Segunda dosis de la vacuna contra la influenza pediátrica: vacuna contra la gripe y bronquitis.

[12 - 14] meses 
Primera dosis de la vacuna contra el sarampión, paperas y rubéola (SPR).
Tercera dosis de la vacuna antineumocócica: protección contra la neumonía, meningitis y otitis media.
Dosis única de la vacuna contra la varicela.
Dosis anual de la vacuna contra la influenza pediátrica: vacuna contra la gripe y bronquitis.

[15 - 17] meses
Dosis única de la vacuna antiamarílica (AMA): contra la fiebre amarilla.
Dosis única de la vacuna contra el virus de la hepatitis A.

[18 - 23] meses
Primera dosis de refuerzo de la vacuna de la difteria, pertussis y tétanos (DPT): vacuna que previene la difteria, tétanos y tos ferina.
Primera dosis de refuerzo de la vacuna antipolio oral (IPV): protección contra la parálisis flácida aguda.
Segunda dosis de la vacuna contra el sarampión, paperas y rubéola (SPR).

[2 - 3] anios
Dosis anual de la vacuna contra la influenza pediátrica.

[4 - 8] anios
Dosis anual de la vacuna contra la influenza pediátrica.
Segunda dosis de refuerzo de la vacuna de la difteria, pertussis y tétanos (DPT): vacuna que previene la difteria, tétanos y tos ferina.
Segunda dosis de refuerzo de la vacuna antipolio oral (APO): vacuna contra la parálisis flácida aguda.

[9 - 13] anios 
Vacuna contra el virus del papiloma humano (VPH): Prevención del cáncer de cuello uterino y verrugas genitales.
Niñas: una dosis.
Niños: una dosis.

[14 - 18] anios
Vacuna contra el virus del papiloma humano (VPH): Prevención del cáncer de cuello uterino y verrugas genitales.
Mujeres: una dosis, siempre y cuando no se haya aplicado antes.
Hombres: una dosis, siempre y cuando no se haya aplicado antes.

[19 - 59] anios
Vacuna antiamarílica: Contra la fiebre amarilla (para personas de 15 meses a 59 años que viajen a áreas de riesgo por turismo o trabajo, con un mínimo de 10 días previos al viaje, como para residentes en zonas endémicas).
Vacuna contra la hepatitis B: Para personas con condiciones de comorbilidad.
Vacuna contra la influenza: Para personas con condiciones de comorbilidad.

60 - mas anios
Dosis anual de la vacuna contra la influenza.
Dosis única de la vacuna antineumocócica: protección contra la neumonía, meningitis y otitis media.

*/
export const esquemaVacunacion = [
  { maxAnios: 0, minMeses: 0, maxMeses: 1, vacunas: [
      { nombre: "BCG (Tuberculosis)", descripcion: "Dosis única contra las formas graves de tuberculosis (TB)." },
      { nombre: "HvB (Hepatitis B)", descripcion: "Dosis única contra la hepatitis B." }
    ]
  },
  { maxAnios: 0, minMeses: 2, maxMeses: 3, vacunas: [
      { nombre: "Pentavalente", descripcion: "Primera dosis, previene difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B." },
      { nombre: "IPV (Poliomielitis)", descripcion: "Primera dosis contra la parálisis flácida aguda." },
      { nombre: "Rotavirus", descripcion: "Primera dosis contra las diarreas por rotavirus." },
      { nombre: "Antineumocócica", descripcion: "Primera dosis contra neumonía, meningitis y otitis media." }
    ]
  },
  { maxAnios: 0, minMeses: 4, maxMeses: 5, vacunas: [
      { nombre: "Pentavalente", descripcion: "Segunda dosis, previene difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B." },
      { nombre: "IPV (Poliomielitis)", descripcion: "Segunda dosis contra la parálisis flácida aguda." },
      { nombre: "Rotavirus", descripcion: "Segunda dosis contra las diarreas por rotavirus." },
      { nombre: "Antineumocócica", descripcion: "Segunda dosis contra neumonía, meningitis y otitis media." }
    ]
  },
  { maxAnios: 0, minMeses: 6, maxMeses: 6, vacunas: [
      { nombre: "Pentavalente", descripcion: "Tercera dosis, previene difteria, tétanos, tos ferina (DPT), neumonía, meningitis por haemophilus tipo b y hepatitis B." },
      { nombre: "IPV (Poliomielitis)", descripcion: "Tercera dosis contra la parálisis flácida aguda." },
      { nombre: "Influenza Ped.", descripcion: "Primera dosis contra la gripe y bronquitis." }
    ]
  },
  { maxAnios: 0, minMeses: 7, maxMeses: 11, vacunas: [
      { nombre: "Influenza Ped.", descripcion: "Segunda dosis contra la gripe y bronquitis." }
    ]
  },
  { maxAnios: 1, minMeses: 12, maxMeses: 14, vacunas: [
      { nombre: "SPR (Sarampión, Paperas, Rubéola)", descripcion: "Primera dosis contra estas enfermedades." },
      { nombre: "Antineumocócica", descripcion: "Tercera dosis contra neumonía, meningitis y otitis media." },
      { nombre: "Varicela", descripcion: "Dosis única contra la varicela." },
      { nombre: "Influenza Ped.", descripcion: "Dosis anual contra la gripe y bronquitis." }
    ]
  },
  { maxAnios: 1, minMeses: 15, maxMeses: 17, vacunas: [
      { nombre: "AMA (Antiamarílica)", descripcion: "Dosis única contra la fiebre amarilla." },
      { nombre: "Hepatitis A", descripcion: "Dosis única contra la hepatitis A." }
    ]
  },
  { maxAnios: 1, minMeses: 18, maxMeses: 23, vacunas: [
      { nombre: "DPT (Difteria, Tétanos, Tos Ferina)", descripcion: "Primer refuerzo." },
      { nombre: "IPV (Poliomielitis)", descripcion: "Primer refuerzo." },
      { nombre: "SPR (Sarampión, Paperas, Rubéola)", descripcion: "Segunda dosis." }
    ]
  },
  { maxAnios: 3, minAnios: 2, vacunas: [
      { nombre: "Influenza Ped.", descripcion: "Dosis anual contra la gripe y bronquitis." }
    ]
  },
  { maxAnios: 8, minAnios: 4, vacunas: [
      { nombre: "Influenza Ped.", descripcion: "Dosis anual contra la gripe y bronquitis." },
      { nombre: "DPT", descripcion: "Segundo refuerzo contra la difteria, tétanos y tos ferina." },
      { nombre: "APO (Poliomielitis Oral)", descripcion: "Segundo refuerzo." }
    ]
  },
  { maxAnios: 13, minAnios: 9, vacunas: [
      { nombre: "VPH (Virus del Papiloma Humano)", descripcion: "Una dosis para niñas y niños." }
    ]
  },
  { maxAnios: 18, minAnios: 14, vacunas: [
      { nombre: "VPH", descripcion: "Una dosis para hombres y mujeres que no la hayan recibido antes." }
    ]
  },
  { maxAnios: 59, minAnios: 19, vacunas: [
      { nombre: "Antiamarílica", descripcion: "Para quienes viajan a áreas de riesgo o residentes en zonas endémicas." },
      { nombre: "Hepatitis B", descripcion: "Para personas con comorbilidades." },
      { nombre: "Influenza", descripcion: "Para personas con comorbilidades." }
    ]
  },
  { minAnios: 60, maxAnios: Infinity, vacunas: [
      { nombre: "Influenza", descripcion: "Dosis anual contra la gripe." },
      { nombre: "Neumococo", descripcion: "Dosis única contra neumonía, meningitis y otitis media." }
    ]
  }
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
