document.getElementById("dniForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const dni = document.getElementById("dni").value;
    
    try {
        const response = await fetch(`/api/patients/${dni}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("resultado").innerHTML = `
                <p><strong>HCN:</strong> ${data.NroHistoriaClinica}</p>
                <p><strong>Apellido Paterno:</strong> ${data.ApellidoPaterno}</p>
                <p><strong>Apellido Materno:</strong> ${data.ApellidoMaterno}</p>
                <p><strong>Nombre:</strong> ${data.PrimerNombre} ${data.SegundoNombre || ''}</p>
            `;
        } else {
            document.getElementById("resultado").innerHTML = `<p style="color: red;">Paciente no encontrado</p>`;
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
        document.getElementById("resultado").innerHTML = `<p style="color: red;">Error al consultar los datos</p>`;
    }
});