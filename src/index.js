import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);

console.log("Server on port", PORT);

/*
import { getConnection, mysql } from "./database/connection.js";
const testConnection = async () => {
  try {
    // Llamamos a la función que obtiene la conexión
    const connection = await getConnection();
    console.log("¡Conexión exitosa a MySQL!");

    // Puedes realizar más pruebas si lo deseas
    // Por ejemplo, podrías realizar una consulta simple
    const [rows] = await connection.query("SELECT 1");
    console.log("Resultado de la consulta:", rows);

    // Recuerda cerrar la conexión después de usarla
    await connection.end();
  } catch (error) {
    console.error("Error al probar la conexión:", error);
  }
};

// Llamamos a la función de prueba
testConnection();
*/