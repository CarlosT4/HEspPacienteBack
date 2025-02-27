// Función para calcular la edad en años, meses o días
export const calcularEdad = (fechaNacimiento) => {
    let fechaNac = new Date(fechaNacimiento);
    let fechaActual = new Date();

    let edadAnios = fechaActual.getUTCFullYear() - fechaNac.getUTCFullYear();
    let edadMeses = fechaActual.getUTCMonth() - fechaNac.getUTCMonth();
    let edadDias = fechaActual.getUTCDate() - fechaNac.getUTCDate();

    // Ajustar si aún no ha cumplido el mes
    if (edadDias < 0) {
        edadMeses -= 1;
        let ultimoDiaMesAnterior = new Date(fechaActual.getUTCFullYear(), fechaActual.getUTCMonth(), 0).getUTCDate();
        edadDias += ultimoDiaMesAnterior;
    }

    // Si meses es negativo, restamos un año y ajustamos meses
    if (edadMeses < 0) {
        edadAnios -= 1;
        edadMeses += 12;
    }

    return { anios: edadAnios, meses: edadMeses, dias: edadDias };
};

// Función para calcular la fecha a partir de la edad mínima o máxima
export const calcularFecha = (fechaNacimiento, anios, meses) => {
    let fecha = new Date(fechaNacimiento);
    fecha.setUTCFullYear(fecha.getUTCFullYear() + anios);
    fecha.setUTCMonth(fecha.getUTCMonth() + meses);

    // Formatear como DD-MM-YYYY
    let dia = fecha.getUTCDate().toString().padStart(2, "0");
    let mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    let anio = fecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
};

//Formatear un objeto edad para mostar en anios meses y dias
export const formatEdad = (edad) => {
    if (edad.anios >= 2) {
      return `${edad.anios} años`;
    } else if (edad.anios === 1) {
      return `${edad.anios} año, ${edad.meses} meses`;
    } else if (edad.meses > 0) {
      return `${edad.meses} meses`;
    } else {
      return `${edad.dias} días`;
    }
  }
