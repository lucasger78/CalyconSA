// =============================================
//  FormularioPostulacion.js
//  Calycon - Formulario de Postulaciones
// =============================================

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWuCaMnro3kO2Jb9cXDJK628aNV3VG6G_TZjb8BA3feq2DKWpkZ3d2SjKn1sUsGtYZsQ/exec';

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. TIPO DE PERFIL ────────────────────────────────────────────────────────
  document.querySelectorAll('input[name="tipoPerfil"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var esOperario = this.value === 'Operario';
      document.getElementById('seccion-operario').style.display    = esOperario ? 'block' : 'none';
      document.getElementById('seccion-profesional').style.display = esOperario ? 'none'  : 'block';
      document.getElementById('grupo-profesion').style.display     = esOperario ? 'block' : 'none';
      document.getElementById('grupo-titulo').style.display        = esOperario ? 'none'  : 'block';
      if (esOperario) {
        document.querySelector('input[name="tituloProfesional"]').value = '';
      } else {
        document.querySelector('input[name="profesion"]').value = '';
        var selectOficio = document.querySelector('select[name="oficioPrincipal"]');
        if (selectOficio) selectOficio.value = '';
      }
    });
  });

  // ── 2. REFERIDO ──────────────────────────────────────────────────────────────
  document.querySelectorAll('input[name="referido"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mostrar = this.value === 'Sí';
      document.getElementById('grupo-referente').style.display = mostrar ? 'block' : 'none';
      if (!mostrar) document.querySelector('input[name="nombreReferente"]').value = '';
    });
  });

  // ── 3. CONOCIDOS EN CALYCON ──────────────────────────────────────────────────
  document.querySelectorAll('input[name="tieneConocidos"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mostrar = this.value === 'Sí';
      document.getElementById('grupo-conocido').style.display = mostrar ? 'block' : 'none';
      if (!mostrar) document.querySelector('input[name="nombreConocido"]').value = '';
    });
  });

  // ── 4. TRABAJÓ CON CALYCON ───────────────────────────────────────────────────
  document.querySelectorAll('input[name="trabajoCalycon"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mostrar = this.value === 'Sí';
      document.getElementById('grupo-motivo-baja').style.display = mostrar ? 'block' : 'none';
      if (!mostrar) document.querySelector('textarea[name="motivoBaja"]').value = '';
    });
  });

  // ── 5. EXPERIENCIA STELLANTIS ────────────────────────────────────────────────
  document.querySelectorAll('input[name="experienciaStellantis"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mostrar = this.value === 'Sí';
      document.getElementById('grupo-stellantis').style.display = mostrar ? 'block' : 'none';
      if (!mostrar) {
        document.querySelectorAll('input[name="modalidad"]').forEach(function (r) { r.checked = false; });
        document.getElementById('grupo-empresa').style.display = 'none';
        document.querySelector('input[name="nombreEmpresa"]').value = '';
      }
    });
  });

  // ── 6. MODALIDAD ─────────────────────────────────────────────────────────────
  document.querySelectorAll('input[name="modalidad"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mostrar = this.value === 'Tercerizada';
      document.getElementById('grupo-empresa').style.display = mostrar ? 'block' : 'none';
      if (!mostrar) document.querySelector('input[name="nombreEmpresa"]').value = '';
    });
  });

  // ── 7. VALIDACIÓN ARCHIVOS ───────────────────────────────────────────────────
  document.querySelectorAll('input[type="file"]').forEach(function (input) {
    input.addEventListener('change', function () { validarArchivo(this); });
  });

  // ── 8. SUBMIT ────────────────────────────────────────────────────────────────
  document.getElementById('formulario-postulacion').addEventListener('submit', async function (e) {
    e.preventDefault();
    await enviarFormulario(this);
  });

});


// ── Validar archivo ───────────────────────────────────────────────────────────
function validarArchivo(input) {
  var file = input.files[0];
  if (!file) return true;
  if (file.size > 5 * 1024 * 1024) {
    Swal.fire({ icon: 'error', title: 'Archivo muy grande', text: '"' + input.name + '" supera 5MB.', confirmButtonColor: '#c0392b' });
    input.value = ''; return false;
  }
  if (!['application/pdf','image/jpeg','image/jpg','image/png'].includes(file.type)) {
    Swal.fire({ icon: 'error', title: 'Formato no válido', text: '"' + input.name + '" debe ser PDF, JPG o PNG.', confirmButtonColor: '#c0392b' });
    input.value = ''; return false;
  }
  return true;
}


// ── Enviar formulario ─────────────────────────────────────────────────────────
async function enviarFormulario(form) {
  var btnEnviar    = document.getElementById('btn-enviar');
  var msgContainer = document.getElementById('mensaje-container');

  btnEnviar.disabled    = true;
  btnEnviar.textContent = 'Enviando...';
  msgContainer.innerHTML = '';

  Swal.fire({
    title: 'Enviando postulación...',
    text:  'Por favor esperá, estamos subiendo tus archivos.',
    allowOutsideClick: false,
    didOpen: function () { Swal.showLoading(); }
  });

  try {
    var datos    = recolectarDatos();
    var archivos = await leerArchivos(form);

    console.log('=== DATOS ===', JSON.stringify(datos, null, 2));
    console.log('=== ARCHIVOS ===', archivos.map(function(a){ return a.campo + ': ' + a.nombre; }));

    var response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST', redirect: 'follow',
      body: JSON.stringify({ datos: datos, archivos: archivos })
    });

    var texto = await response.text();
    console.log('=== RESPUESTA ===', texto);

    var result;
    try   { result = JSON.parse(texto); }
    catch (_) { result = { status: 'ok' }; }

    Swal.close();

    if (result.status === 'ok') {
      Swal.fire({
        imageUrl: 'img/logoDark_ok.png',
        imageHeight: 60, // ajusta el tamaño según tu logo
        imageAlt: 'Logo',
        icon: 'success',
        title: '¡Postulación enviada!',
        html: 'Recibimos tu postulación correctamente.<br>Nos pondremos en contacto a la brevedad.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1975b7',
        customClass: {
          title: 'swal-title-custom'               
           }
      });

      form.reset();
      ['seccion-operario','seccion-profesional','grupo-referente','grupo-conocido',
       'grupo-motivo-baja','grupo-stellantis','grupo-empresa','grupo-titulo','grupo-profesion']
        .forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; });
    } else {
      throw new Error(result.message || 'Error desconocido en el servidor.');
    }

  } catch (err) {
    console.error(err);
    Swal.close();
    Swal.fire({
      icon: 'error', title: 'Error al enviar',
      html: 'Ocurrió un problema:<br><b>' + err.message + '</b><br><br>Por favor intentá nuevamente.',
      confirmButtonText: 'Cerrar', confirmButtonColor: '#c0392b'
    });
  } finally {
    btnEnviar.disabled    = false;
    btnEnviar.textContent = 'Enviar Postulación';
    msgContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


// ── Recolectar datos — lee directo del DOM, sin FormData ──────────────────────
function recolectarDatos() {
  var campos = [
    'tipoPerfil',
    'nombreCompleto','cuil','fechaNacimiento','telefono','email',
    'provincia','localidad','calle','numero','piso','dpto','barrio',
    'referido','nombreReferente',
    'tieneConocidos','nombreConocido',
    'trabajoCalycon','motivoBaja',
    'experienciaStellantis','modalidad','nombreEmpresa',
    'oficioPrincipal',
    'puestoInteres','anosExperiencia',
    'nivelEducativo','tituloProfesional','profesion',
    'disponibilidadHoraria','tipoLicencia'
  ];

  var datos = {};
  campos.forEach(function (nombre) {
    // Radio: buscar el marcado
    var radioChecked = document.querySelector('input[type="radio"][name="' + nombre + '"]:checked');
    if (radioChecked) { datos[nombre] = radioChecked.value; return; }
    var anyRadio = document.querySelector('input[type="radio"][name="' + nombre + '"]');
    if (anyRadio) { datos[nombre] = ''; return; }

    // Textarea
    var textarea = document.querySelector('textarea[name="' + nombre + '"]');
    if (textarea) { datos[nombre] = textarea.value.trim(); return; }

    // Select / input
    var el = document.querySelector('[name="' + nombre + '"]');
    datos[nombre] = el ? el.value.trim() : '';
  });

  return datos;
}


// ── Leer archivos y convertir a base64 ───────────────────────────────────────
function leerArchivos(form) {
  var camposArchivo = ['licenciaFrente','licenciaDorso','dniFrente','dniDorso','cv'];
  var promesas = camposArchivo.map(function (nombre) {
    var input = form.elements[nombre];
    if (!input || !input.files || input.files.length === 0) return Promise.resolve(null);
    var file = input.files[0];
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload  = function (e) {
        resolve({ campo: nombre, nombre: file.name, tipo: file.type, base64: e.target.result.split(',')[1] });
      };
      reader.onerror = function () { reject(new Error('No se pudo leer: ' + nombre)); };
      reader.readAsDataURL(file);
    });
  });
  return Promise.all(promesas).then(function (r) { return r.filter(function (x) { return x !== null; }); });
}
