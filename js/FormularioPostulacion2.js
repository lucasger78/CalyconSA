// // FormularioPostulacion.js
// // JavaScript puro para manejar el formulario de postulaciones

// // ========== CONFIGURACIÓN ==========
// // IMPORTANTE: Reemplaza esta URL con la de tu Google Apps Script
// const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxp2ww9kTv5XO0_9p4K1m-Lfk30eUy69OXp0vYten9FEjntFq20HxDot4OU8NprbJflpg/exec';

// // ========== VARIABLES GLOBALES ==========
// const form = document.getElementById('formulario-postulacion');
// const btnEnviar = document.getElementById('btn-enviar');
// const mensajeContainer = document.getElementById('mensaje-container');

// // ========== MOSTRAR/OCULTAR CAMPOS CONDICIONALES ==========

// // Referido
// document.querySelectorAll('input[name="referido"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const grupoReferente = document.getElementById('grupo-referente');
//         const inputReferente = document.querySelector('input[name="nombreReferente"]');
        
//         if (this.value === 'Sí') {
//             grupoReferente.style.display = 'flex';
//             inputReferente.required = true;
//         } else {
//             grupoReferente.style.display = 'none';
//             inputReferente.required = false;
//             inputReferente.value = '';
//         }
//     });
// });

// // Conocidos en Calycon
// document.querySelectorAll('input[name="tieneConocidos"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const grupoConocido = document.getElementById('grupo-conocido');
//         const inputConocido = document.querySelector('input[name="nombreConocido"]');
        
//         if (this.value === 'Sí') {
//             grupoConocido.style.display = 'flex';
//             inputConocido.required = true;
//         } else {
//             grupoConocido.style.display = 'none';
//             inputConocido.required = false;
//             inputConocido.value = '';
//         }
//     });
// });

// // Trabajó con Calycon
// document.querySelectorAll('input[name="trabajoCalycon"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const grupoMotivo = document.getElementById('grupo-motivo-baja');
//         const inputMotivo = document.querySelector('textarea[name="motivoBaja"]');
        
//         if (this.value === 'Sí') {
//             grupoMotivo.style.display = 'flex';
//             inputMotivo.required = true;
//         } else {
//             grupoMotivo.style.display = 'none';
//             inputMotivo.required = false;
//             inputMotivo.value = '';
//         }
//     });
// });

// // Experiencia Stellantis
// document.querySelectorAll('input[name="experienciaStellantis"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const grupoStellantis = document.getElementById('grupo-stellantis');
//         const inputsModalidad = document.querySelectorAll('input[name="modalidad"]');
        
//         if (this.value === 'Sí') {
//             grupoStellantis.style.display = 'block';
//             inputsModalidad.forEach(input => input.required = true);
//         } else {
//             grupoStellantis.style.display = 'none';
//             inputsModalidad.forEach(input => {
//                 input.required = false;
//                 input.checked = false;
//             });
//             document.getElementById('grupo-empresa').style.display = 'none';
//             document.querySelector('input[name="nombreEmpresa"]').value = '';
//         }
//     });
// });

// // Modalidad (Directa/Tercerizada)
// document.querySelectorAll('input[name="modalidad"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const grupoEmpresa = document.getElementById('grupo-empresa');
//         const inputEmpresa = document.querySelector('input[name="nombreEmpresa"]');
        
//         if (this.value === 'Tercerizada') {
//             grupoEmpresa.style.display = 'flex';
//             inputEmpresa.required = true;
//         } else {
//             grupoEmpresa.style.display = 'none';
//             inputEmpresa.required = false;
//             inputEmpresa.value = '';
//         }
//     });
// });

// // Tipo de Perfil (Operario/Profesional)
// document.querySelectorAll('input[name="tipoPerfil"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const seccionOperario = document.getElementById('seccion-operario');
//         const seccionProfesional = document.getElementById('seccion-profesional');
//         const selectOficio = document.querySelector('select[name="oficioPrincipal"]');
//         const selectPuesto = document.querySelector('select[name="puestoInteres"]');
//         const selectAnos = document.querySelector('select[name="anosExperiencia"]');
        
//         if (this.value === 'Operario') {
//             // Mostrar sección Operario
//             seccionOperario.style.display = 'block';
//             seccionProfesional.style.display = 'none';
            
//             // Hacer obligatorio el campo de oficio
//             selectOficio.required = true;
            
//             // Hacer opcionales los campos profesionales
//             selectPuesto.required = false;
//             selectAnos.required = false;
            
//             // Limpiar campos profesionales
//             selectPuesto.value = '';
//             selectAnos.value = '';
//         } else if (this.value === 'Profesional') {
//             // Mostrar sección Profesional
//             seccionOperario.style.display = 'none';
//             seccionProfesional.style.display = 'block';
            
//             // Hacer opcionales el campo de oficio
//             selectOficio.required = false;
            
//             // Hacer obligatorios los campos profesionales
//             selectPuesto.required = true;
//             selectAnos.required = true;
            
//             // Limpiar campo de operario
//             selectOficio.value = '';
//         }
//     });
// });

// // ========== VALIDACIÓN DE ARCHIVOS ==========
// function validarArchivo(input) {
//     const file = input.files[0];
//     if (!file) return true;
    
//     // Validar tamaño (5MB)
//     const maxSize = 5 * 1024 * 1024; // 5MB en bytes
//     if (file.size > maxSize) {
//         mostrarMensaje('error', 'El archivo ' + input.name + ' no debe superar 5MB');
//         input.value = '';
//         return false;
//     }
    
//     // Validar tipo
//     const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//     if (!tiposPermitidos.includes(file.type)) {
//         mostrarMensaje('error', 'El archivo ' + input.name + ' debe ser PDF, JPG o PNG');
//         input.value = '';
//         return false;
//     }
    
//     return true;
// }

// // Agregar validación a todos los inputs de archivo
// document.querySelectorAll('input[type="file"]').forEach(input => {
//     input.addEventListener('change', function() {
//         validarArchivo(this);
//     });
// });

// // ========== MOSTRAR MENSAJES ==========
// function mostrarMensaje(tipo, texto) {
//     mensajeContainer.innerHTML = `
//         <div class="mensaje mensaje-${tipo}">
//             ${texto}
//         </div>
//     `;
    
//     // Scroll al mensaje
//     mensajeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
//     // Auto-ocultar después de 5 segundos si es éxito
//     if (tipo === 'exito') {
//         setTimeout(() => {
//             mensajeContainer.innerHTML = '';
//         }, 5000);
//     }
// }

// // ========== CONVERTIR ARCHIVO A BASE64 ==========
// function archivoABase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//         reader.readAsDataURL(file);
//     });
// }

// // ========== ENVIAR FORMULARIO ==========
// form.addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     // Deshabilitar botón
//     btnEnviar.disabled = true;
//     btnEnviar.textContent = 'Enviando...';
//     mensajeContainer.innerHTML = '';
    
//     try {
//         // Recopilar datos del formulario
//         const formData = new FormData(form);
//         const datos = {};
        
//         // Obtener todos los campos de texto
//         for (let [key, value] of formData.entries()) {
//             if (!form.elements[key].files || form.elements[key].files.length === 0) {
//                 datos[key] = value;
//             }
//         }
        
//         // Procesar archivos
//         const archivos = ['dniFrente', 'dniDorso', 'licenciaFrente', 'licenciaDorso', 'cv'];
//         for (let nombreArchivo of archivos) {
//             const input = form.elements[nombreArchivo];
//             if (input && input.files && input.files[0]) {
//                 const base64 = await archivoABase64(input.files[0]);
//                 datos[nombreArchivo] = base64;
//             }
//         }
        
//         // Crear dirección completa
//         datos.direccion = `${datos.calle || ''} ${datos.numero || ''} ${datos.piso ? 'Piso ' + datos.piso : ''} ${datos.dpto ? 'Dpto ' + datos.dpto : ''}`.trim();
        
//         // Enviar al Google Apps Script
//         const response = await fetch(GOOGLE_SCRIPT_URL, {
//             method: 'POST',
//             mode: 'no-cors', // Importante para Google Apps Script
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(datos)
//         });
        
//         // Como usamos no-cors, no podemos leer la respuesta
//         // Asumimos que fue exitoso si no hubo error
//         mostrarMensaje('exito', '¡Postulación enviada exitosamente! Nos pondremos en contacto pronto.');
        
//         // Limpiar formulario después de 2 segundos
//         setTimeout(() => {
//             form.reset();
//             // Ocultar secciones condicionales
//             document.getElementById('seccion-operario').style.display = 'none';
//             document.getElementById('seccion-profesional').style.display = 'none';
//             document.getElementById('grupo-referente').style.display = 'none';
//             document.getElementById('grupo-conocido').style.display = 'none';
//             document.getElementById('grupo-motivo-baja').style.display = 'none';
//             document.getElementById('grupo-stellantis').style.display = 'none';
//             document.getElementById('grupo-empresa').style.display = 'none';
//         }, 2000);
        
//     } catch (error) {
//         console.error('Error:', error);
//         mostrarMensaje('error', 'Hubo un error al enviar la postulación. Por favor, inténtalo nuevamente.');
//     } finally {
//         // Rehabilitar botón
//         btnEnviar.disabled = false;
//         btnEnviar.textContent = 'Enviar Postulación';
//     }
// });

// // ========== VALIDACIÓN DE CUIL ==========
// document.querySelector('input[name="cuil"]').addEventListener('blur', function() {
//     const cuil = this.value.replace(/\s/g, '');
//     const regex = /^\d{2}-?\d{8}-?\d$/;
    
//     if (cuil && !regex.test(cuil)) {
//         this.setCustomValidity('Formato de CUIL inválido. Debe ser XX-XXXXXXXX-X');
//     } else {
//         this.setCustomValidity('');
//     }
// });





// // =============================================
// //  FormularioPostulacion.js
// //  Envía el formulario al Google Apps Script
// // =============================================

// const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzV2l5iJ7Q0hbpTaoszIQu-AS5UwVrHSLAWsOVjFWQxnV3QzOK1VCXvJ6fcDH6salCFXw/exec';

// // ── Mostrar/ocultar secciones condicionales ──────────────────────────────────

// document.addEventListener('DOMContentLoaded', function () {

//   // Tipo de perfil → secciones operario / profesional
//   document.querySelectorAll('input[name="tipoPerfil"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       const esOperario = this.value === 'Operario';
//       document.getElementById('seccion-operario').style.display    = esOperario ? 'block' : 'none';
//       document.getElementById('seccion-profesional').style.display = esOperario ? 'none'  : 'block';
//     });
//   });

//   // Referido
//   document.querySelectorAll('input[name="referido"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       document.getElementById('grupo-referente').style.display = this.value === 'Sí' ? 'block' : 'none';
//     });
//   });

//   // Conocidos en Calycon
//   document.querySelectorAll('input[name="tieneConocidos"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       document.getElementById('grupo-conocido').style.display = this.value === 'Sí' ? 'block' : 'none';
//     });
//   });

//   // Trabajó con Calycon
//   document.querySelectorAll('input[name="trabajoCalycon"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       document.getElementById('grupo-motivo-baja').style.display = this.value === 'Sí' ? 'block' : 'none';
//     });
//   });

//   // Experiencia Stellantis
//   document.querySelectorAll('input[name="experienciaStellantis"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       document.getElementById('grupo-stellantis').style.display = this.value === 'Sí' ? 'block' : 'none';
//     });
//   });

//   // Modalidad → empresa tercerizadora
//   document.querySelectorAll('input[name="modalidad"]').forEach(function (radio) {
//     radio.addEventListener('change', function () {
//       document.getElementById('grupo-empresa').style.display = this.value === 'Tercerizada' ? 'block' : 'none';
//     });
//   });

//   // ── Submit ───────────────────────────────────────────────────────────────
//   document.getElementById('formulario-postulacion').addEventListener('submit', async function (e) {
//     e.preventDefault();
//     enviarFormulario(this);
//   });
// });


// // ── Función principal de envío ────────────────────────────────────────────────

// async function enviarFormulario(form) {
//   const btnEnviar   = document.getElementById('btn-enviar');
//   const msgContainer = document.getElementById('mensaje-container');

//   // Estado: enviando
//   btnEnviar.disabled    = true;
//   btnEnviar.textContent = 'Enviando...';
//   msgContainer.innerHTML = '';

//   try {
//     // 1. Recolectar campos de texto
//     const datos = recolectarDatos(form);

//     // 2. Leer archivos como base64
//     const archivos = await leerArchivos(form);

//     // 3. Armar payload
//     const payload = {
//       datos:    datos,
//       archivos: archivos
//     };

//     // 4. Enviar al Apps Script (POST con text/plain para evitar preflight CORS)
//     const response = await fetch(APPS_SCRIPT_URL, {
//       method:  'POST',
//       body:    JSON.stringify(payload)
//     });

//     const result = await response.json();

//     if (result.status === 'ok') {
//       mostrarMensaje(msgContainer, 'success',
//         '✅ ¡Postulación enviada con éxito! Nos pondremos en contacto a la brevedad.');
//       form.reset();
//       // Ocultar secciones condicionales
//       ['seccion-operario','seccion-profesional','grupo-referente',
//        'grupo-conocido','grupo-motivo-baja','grupo-stellantis','grupo-empresa']
//         .forEach(function(id) {
//           var el = document.getElementById(id);
//           if (el) el.style.display = 'none';
//         });
//     } else {
//       throw new Error(result.message || 'Error desconocido en el servidor.');
//     }

//   } catch (err) {
//     console.error(err);
//     mostrarMensaje(msgContainer, 'error',
//       '❌ Ocurrió un error al enviar el formulario: ' + err.message +
//       '. Por favor intentá nuevamente o contactanos directamente.');
//   } finally {
//     btnEnviar.disabled    = false;
//     btnEnviar.textContent = 'Enviar Postulación';
//     // Scroll al mensaje
//     msgContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   }
// }


// // ── Recolectar todos los campos de texto/select/radio/textarea ───────────────

// function recolectarDatos(form) {
//   const datos = {};
//   const formData = new FormData(form);
//   formData.forEach(function (value, key) {
//     // Saltar campos de tipo file (se manejan aparte)
//     if (form.elements[key] && form.elements[key].type === 'file') return;
//     if (typeof value === 'string') {
//       datos[key] = value;
//     }
//   });
//   return datos;
// }


// // ── Leer archivos y convertir a base64 ───────────────────────────────────────

// function leerArchivos(form) {
//   const camposArchivo = ['dniFrente', 'dniDorso', 'licenciaFrente', 'licenciaDorso', 'cv'];
//   const promesas = camposArchivo.map(function (nombre) {
//     const input = form.elements[nombre];
//     if (!input || !input.files || input.files.length === 0) {
//       return Promise.resolve({ campo: nombre, archivo: null });
//     }
//     const file = input.files[0];
//     return new Promise(function (resolve, reject) {
//       const reader = new FileReader();
//       reader.onload  = function (e) {
//         // e.target.result es "data:image/png;base64,XXXXXX..."
//         const base64 = e.target.result.split(',')[1];
//         resolve({
//           campo:     nombre,
//           nombre:    file.name,
//           tipo:      file.type,
//           base64:    base64
//         });
//       };
//       reader.onerror = function () { reject(new Error('No se pudo leer el archivo ' + nombre)); };
//       reader.readAsDataURL(file);
//     });
//   });
//   return Promise.all(promesas);
// }


// // ── Mostrar mensaje de éxito / error ─────────────────────────────────────────

// function mostrarMensaje(container, tipo, texto) {
//   const colores = {
//     success: { fondo: '#d4edda', borde: '#28a745', texto: '#155724' },
//     error:   { fondo: '#f8d7da', borde: '#dc3545', texto: '#721c24' }
//   };
//   const c = colores[tipo];
//   container.innerHTML =
//     '<div style="padding:16px 20px; margin:20px 0; border-radius:8px; ' +
//     'background:' + c.fondo + '; border:1px solid ' + c.borde + '; ' +
//     'color:' + c.texto + '; font-size:15px; font-weight:500;">' +
//     texto + '</div>';
// }




// =============================================
//  FormularioPostulacion.js
//  Envía el formulario al Google Apps Script
// =============================================

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxp2ww9kTv5XO0_9p4K1m-Lfk30eUy69OXp0vYten9FEjntFq20HxDot4OU8NprbJflpg/exec';

// ── Mostrar/ocultar secciones condicionales ──────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {

  // Tipo de perfil → secciones operario / profesional + campos condicionales
  document.querySelectorAll('input[name="tipoPerfil"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const esOperario = this.value === 'Operario';
      document.getElementById('seccion-operario').style.display    = esOperario ? 'block' : 'none';
      document.getElementById('seccion-profesional').style.display = esOperario ? 'none'  : 'block';
      // Campo título (solo profesional) y profesión (solo operario)
      document.getElementById('grupo-titulo').style.display    = esOperario ? 'none'  : 'block';
      document.getElementById('grupo-profesion').style.display = esOperario ? 'block' : 'none';
    });
  });

  // Referido
  document.querySelectorAll('input[name="referido"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('grupo-referente').style.display = this.value === 'Sí' ? 'block' : 'none';
    });
  });

  // Conocidos en Calycon
  document.querySelectorAll('input[name="tieneConocidos"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('grupo-conocido').style.display = this.value === 'Sí' ? 'block' : 'none';
    });
  });

  // Trabajó con Calycon
  document.querySelectorAll('input[name="trabajoCalycon"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('grupo-motivo-baja').style.display = this.value === 'Sí' ? 'block' : 'none';
    });
  });

  // Experiencia Stellantis
  document.querySelectorAll('input[name="experienciaStellantis"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('grupo-stellantis').style.display = this.value === 'Sí' ? 'block' : 'none';
    });
  });

  // Modalidad → empresa tercerizadora
  document.querySelectorAll('input[name="modalidad"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('grupo-empresa').style.display = this.value === 'Tercerizada' ? 'block' : 'none';
    });
  });

  // ── Submit ───────────────────────────────────────────────────────────────
  document.getElementById('formulario-postulacion').addEventListener('submit', async function (e) {
    e.preventDefault();
    enviarFormulario(this);
  });
});


// ── Función principal de envío ────────────────────────────────────────────────

async function enviarFormulario(form) {
  const btnEnviar   = document.getElementById('btn-enviar');
  const msgContainer = document.getElementById('mensaje-container');

  // Estado: enviando
  btnEnviar.disabled    = true;
  btnEnviar.textContent = 'Enviando...';
  msgContainer.innerHTML = '';

  try {
    // 1. Recolectar campos de texto
    const datos = recolectarDatos(form);

    // 2. Leer archivos como base64
    const archivos = await leerArchivos(form);

    // 3. Armar payload
    const payload = {
      datos:    datos,
      archivos: archivos
    };

    // 4. Enviar al Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method:   'POST',
      redirect: 'follow',
      body:     JSON.stringify(payload)
    });

    // Apps Script a veces devuelve texto plano aunque el mime sea JSON
    const texto = await response.text();
    let result;
    try {
      result = JSON.parse(texto);
    } catch (_) {
      // Si no es JSON válido pero la petición llegó, la consideramos exitosa
      result = { status: 'ok' };
    }

    if (result.status === 'ok') {
      mostrarMensaje(msgContainer, 'success',
        '✅ ¡Postulación enviada con éxito! Nos pondremos en contacto a la brevedad.');
      form.reset();
      // Ocultar secciones condicionales
      ['seccion-operario','seccion-profesional','grupo-referente',
       'grupo-conocido','grupo-motivo-baja','grupo-stellantis','grupo-empresa']
        .forEach(function(id) {
          var el = document.getElementById(id);
          if (el) el.style.display = 'none';
        });
    } else {
      throw new Error(result.message || 'Error desconocido en el servidor.');
    }

  } catch (err) {
    console.error(err);
    mostrarMensaje(msgContainer, 'error',
      '❌ Ocurrió un error al enviar el formulario: ' + err.message +
      '. Por favor intentá nuevamente o contactanos directamente.');
  } finally {
    btnEnviar.disabled    = false;
    btnEnviar.textContent = 'Enviar Postulación';
    // Scroll al mensaje
    msgContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


// ── Recolectar todos los campos de texto/select/radio/textarea ───────────────

function recolectarDatos(form) {
  const datos = {};
  const formData = new FormData(form);
  formData.forEach(function (value, key) {
    // Saltar campos de tipo file (se manejan aparte)
    if (form.elements[key] && form.elements[key].type === 'file') return;
    if (typeof value === 'string') {
      datos[key] = value;
    }
  });
  return datos;
}


// ── Leer archivos y convertir a base64 ───────────────────────────────────────

function leerArchivos(form) {
  const camposArchivo = ['dniFrente', 'dniDorso', 'licenciaFrente', 'licenciaDorso', 'cv'];
  const promesas = camposArchivo.map(function (nombre) {
    const input = form.elements[nombre];
    if (!input || !input.files || input.files.length === 0) {
      return Promise.resolve({ campo: nombre, archivo: null });
    }
    const file = input.files[0];
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload  = function (e) {
        // e.target.result es "data:image/png;base64,XXXXXX..."
        const base64 = e.target.result.split(',')[1];
        resolve({
          campo:     nombre,
          nombre:    file.name,
          tipo:      file.type,
          base64:    base64
        });
      };
      reader.onerror = function () { reject(new Error('No se pudo leer el archivo ' + nombre)); };
      reader.readAsDataURL(file);
    });
  });
  return Promise.all(promesas);
}


// ── Mostrar mensaje de éxito / error ─────────────────────────────────────────

function mostrarMensaje(container, tipo, texto) {
  const colores = {
    success: { fondo: '#d4edda', borde: '#28a745', texto: '#155724' },
    error:   { fondo: '#f8d7da', borde: '#dc3545', texto: '#721c24' }
  };
  const c = colores[tipo];
  container.innerHTML =
    '<div style="padding:16px 20px; margin:20px 0; border-radius:8px; ' +
    'background:' + c.fondo + '; border:1px solid ' + c.borde + '; ' +
    'color:' + c.texto + '; font-size:15px; font-weight:500;">' +
    texto + '</div>';
}