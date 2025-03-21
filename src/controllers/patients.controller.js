import { getConnection, sql } from "../database/connection.js";
import { calcularEdad, formatEdad } from "../utils/ageUtils.js";
import { determinarVacunasYFechas } from "../utils/vaccineUtils.js";

export const getPatientByDNI = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("dni", sql.VarChar, req.params.dni)
      .query(
        `SELECT 
          NroHistoriaClinica, 
          ApellidoPaterno, 
          ApellidoMaterno, 
          PrimerNombre, 
          SegundoNombre, 
          FechaNacimiento
        FROM Pacientes 
        WHERE NroDocumento = @dni`
      );

    if (result.recordset.length === 0) return res.sendStatus(404);

    let paciente = result.recordset[0];

    // Calcular la edad usando la función separada
    let edad = calcularEdad(paciente.FechaNacimiento);

    res.json({
      NroHistoriaClinica: paciente.NroHistoriaClinica,
      ApellidoPaterno: paciente.ApellidoPaterno,
      ApellidoMaterno: paciente.ApellidoMaterno,
      PrimerNombre: paciente.PrimerNombre,
      SegundoNombre: paciente.SegundoNombre,
      Edad: formatEdad(edad)
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para obtener el esquema de vacunación a partir de la fecha de nacimiento
export const getVaccinationScheduleByDNI = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("dni", sql.VarChar, req.params.dni)
      .query(
        `SELECT 
          NroHistoriaClinica, 
          ApellidoPaterno, 
          ApellidoMaterno, 
          PrimerNombre, 
          SegundoNombre, 
          FechaNacimiento 
        FROM Pacientes 
        WHERE NroDocumento = @dni`
      );

    if (result.recordset.length === 0) return res.sendStatus(404);
    
    let paciente = result.recordset[0];

    // Calcular edad
    let edad = calcularEdad(paciente.FechaNacimiento);

    // Obtener vacunas recomendadas y rango de fechas
    let { vacunas, fechaInicio, fechaFin } = determinarVacunasYFechas(edad, paciente.FechaNacimiento);
    
    let edadFormateada = formatEdad(edad);

    res.json({
      NroHistoriaClinica: paciente.NroHistoriaClinica,
      ApellidoPaterno: paciente.ApellidoPaterno,
      ApellidoMaterno: paciente.ApellidoMaterno,
      PrimerNombre: paciente.PrimerNombre,
      SegundoNombre: paciente.SegundoNombre,
      Edad: edadFormateada,
      VacunasRecomendadas: vacunas,
      FechaInicio: fechaInicio ? fechaInicio : "No disponible",
      FechaFin: fechaFin ? fechaFin : "No disponible",
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

