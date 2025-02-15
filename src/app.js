import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import patientsRoutes from "./routes/patients.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
const __dirname = path.resolve();
console.log(__dirname);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", patientsRoutes);

// Ruta para servir el formulario
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to API Hospital");
});

export default app;
