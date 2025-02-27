import express from "express"
import puppeteer from "puppeteer"
import { getPatientByDNI,getVaccinationScheduleByDNI } from "../controllers/patients.controller.js"

const router = express.Router()

// Ruta para obtener datos del paciente por DNI
router.get("/patients/:dni", getPatientByDNI)

// Ruta para obtener esquema de vacunacion del paciente por DNI
router.get("/vacunation/:dni",getVaccinationScheduleByDNI)

// Ruta para generar PDF del carnet del paciente
router.post("/patients/generate-pdf", async (req, res) => {
  try {
    const { htmlContent } = req.body // Recibe el HTML del frontend

    //const browser = await puppeteer.launch()
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    
    
    const page = await browser.newPage()

    await page.setContent(htmlContent, { waitUntil: "load" })
    
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true })


    await browser.close()

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=carnet.pdf")
    res.send(pdfBuffer)
  } catch (error) {
    console.error("Error generando el PDF:", error)
    res.status(500).send("Error generando el PDF")
  }
})

export default router
