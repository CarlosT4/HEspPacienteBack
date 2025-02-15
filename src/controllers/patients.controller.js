import { getConnection, sql } from "../database/connection.js";

// Función para calcular la edad en años, meses o días
const calcularEdad = (fechaNacimiento) => {
  let fechaNac = new Date(fechaNacimiento);
  let fechaActual = new Date();

  let edadAnios = fechaActual.getFullYear() - fechaNac.getFullYear();
  let edadMeses = fechaActual.getMonth() - fechaNac.getMonth();
  let edadDias = fechaActual.getDate() - fechaNac.getDate();

  // Ajustar si aún no ha cumplido el mes
  if (edadDias < 0) {
    edadMeses -= 1;
    let ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
    edadDias += ultimoDiaMesAnterior;
  }

  // Si meses es negativo, restamos un año y ajustamos meses
  if (edadMeses < 0) {
    edadAnios -= 1;
    edadMeses += 12;
  }

  // Determinar cómo mostrar la edad
  if (edadAnios < 0) {
    return "Fecha inválida";
  } else if (edadAnios === 0 && edadMeses === 0) {
    return `${edadDias} días`;
  } else if (edadAnios === 0) {
    return `${edadMeses === 1 ? '1 mes' : `${edadMeses} meses`}`;
  } else if (edadAnios === 1) {
    return `1 año y ${edadMeses} meses`;
  } else {
    return `${edadAnios} años`;
  }
};

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
      Edad: edad
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};
