import sql from "mssql";
import { DB_DATABASE, DB_PASSWORD, DB_HOST, DB_USER, DB_PORT } from "../config.js";

const dbSettings = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  server: DB_HOST,
  port: 1433,
  options: {
    encrypt: false, 
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Error de conexión a SQL Server:", error);
    throw error;
  }
};

// Función para ejecutar una consulta simple
export const getAllData = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM tu_tabla");
    console.log("🔍 Datos obtenidos:", result.recordset);
    return result.recordset;
  } catch (error) {
    console.error("❌ Error al ejecutar la consulta:", error);
    throw error;
  }
};

// Función para ejecutar un procedimiento almacenado
export const executeProcedure = async (param1Value) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("param1", sql.Int, param1Value) // Definir el parámetro
      .execute("NombreProcedimiento");
    console.log("📌 Resultado del procedimiento:", result.recordset);
    return result.recordset;
  } catch (error) {
    console.error("❌ Error al ejecutar el procedimiento:", error);
    throw error;
  }
};

export { sql };