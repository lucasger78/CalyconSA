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
      document.getElementById('grupo-titulo').style.display        = esOperario ? 'none'  : 'block';
      document.getElementById('grupo-profesion').style.display     = esOperario ? 'block' : 'none';
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
  const btnEnviar    = document.getElementById('btn-enviar');
  const msgContainer = document.getElementById('mensaje-container');

  btnEnviar.disabled    = true;
  btnEnviar.textContent = 'Enviando...';
  msgContainer.innerHTML = '';

  try {
    // ── Validaciones campos condicionales ──────────────────────────────────
    const tipoPerfil = form.querySelector('input[name="tipoPerfil"]:checked');
    if (!tipoPerfil) throw new Error('Seleccioná un tipo de perfil.');

    if (tipoPerfil.value === 'Profesional') {
      const titulo = form.elements['tituloProfesional'];
      if (!titulo || !titulo.value.trim()) throw new Error('El campo Título es obligatorio.');
      const puesto = form.elements['puestoInteres'];
      if (!puesto || !puesto.value) throw new Error('El campo Puesto de Interés es obligatorio.');
      const experiencia = form.elements['anosExperiencia'];
      if (!experiencia || !experiencia.value) throw new Error('El campo Años de Experiencia es obligatorio.');
    }
    if (tipoPerfil.value === 'Operario') {
      const profesion = form.elements['profesion'];
      if (!profesion || !profesion.value.trim()) throw new Error('El campo Profesión es obligatorio.');
      const oficio = form.elements['oficioPrincipal'];
      if (!oficio || !oficio.value) throw new Error('El campo Oficio Principal es obligatorio.');
    }
    const referido = form.querySelector('input[name="referido"]:checked');
    if (referido && referido.value === 'Sí') {
      const ref = form.elements['nombreReferente'];
      if (!ref || !ref.value.trim()) throw new Error('El nombre del referente es obligatorio.');
    }
    const conocido = form.querySelector('input[name="tieneConocidos"]:checked');
    if (conocido && conocido.value === 'Sí') {
      const con = form.elements['nombreConocido'];
      if (!con || !con.value.trim()) throw new Error('El nombre del conocido es obligatorio.');
    }
    const trabajoCalycon = form.querySelector('input[name="trabajoCalycon"]:checked');
    if (trabajoCalycon && trabajoCalycon.value === 'Sí') {
      const motivo = form.elements['motivoBaja'];
      if (!motivo || !motivo.value.trim()) throw new Error('El motivo de baja es obligatorio.');
    }
    const stellantis = form.querySelector('input[name="experienciaStellantis"]:checked');
    if (stellantis && stellantis.value === 'Sí') {
      const modalidad = form.querySelector('input[name="modalidad"]:checked');
      if (!modalidad) throw new Error('Seleccioná una modalidad de Stellantis.');
      if (modalidad.value === 'Tercerizada') {
        const empresa = form.elements['nombreEmpresa'];
        if (!empresa || !empresa.value.trim()) throw new Error('El nombre de la empresa tercerizadora es obligatorio.');
      }
    }

    // ── Mostrar alerta de carga ────────────────────────────────────────────
    Swal.fire({
      title: 'Enviando postulación...',
      html: '<span style="color:#555;">Por favor esperá, estamos subiendo tus archivos.</span>',
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => { Swal.showLoading(); }
    });

    // ── Recolectar y enviar ────────────────────────────────────────────────
    const datos    = recolectarDatos(form);
    const archivos = await leerArchivos(form);
    const payload  = { datos, archivos };

    const response = await fetch(APPS_SCRIPT_URL, {
      method:   'POST',
      redirect: 'follow',
      body:     JSON.stringify(payload)
    });

    const texto = await response.text();
    let result;
    try {
      result = JSON.parse(texto);
    } catch (_) {
      result = { status: 'ok' };
    }

    // ── Resultado ─────────────────────────────────────────────────────────
    if (result.status === 'ok') {
      Swal.fire({
        html: `
          <div style="text-align:center; padding: 10px 0;">
            <img src="img/logoDark_ok.png" alt="Calycon" style="max-width:160px; margin-bottom:18px;">
            <div style="font-size:22px; font-weight:700; color:#1a3c6e; margin-bottom:8px;">
              ¡Postulación enviada con éxito!
            </div>
            <div style="font-size:15px; color:#555;">
              Nos pondremos en contacto a la brevedad.
            </div>
          </div>
        `,
        icon: 'success',
        iconColor: '#28a745',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1a3c6e'
      });
      form.reset();
      ['seccion-operario','seccion-profesional','grupo-referente',
       'grupo-conocido','grupo-motivo-baja','grupo-stellantis','grupo-empresa',
       'grupo-titulo','grupo-profesion']
        .forEach(function(id) {
          var el = document.getElementById(id);
          if (el) el.style.display = 'none';
        });
    } else {
      throw new Error(result.message || 'Error desconocido en el servidor.');
    }

  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error al enviar',
      html: '<span style="color:#555;">' + err.message + '.<br>Por favor intentá nuevamente o contactanos directamente.</span>',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#dc3545'
    });
  } finally {
    btnEnviar.disabled    = false;
    btnEnviar.textContent = 'Enviar Postulación';
  }
}

// ── Recolectar todos los campos — incluye campos ocultos ─────────────────────

function recolectarDatos(form) {
  const datos = {};

  // Todos los campos: input, select, textarea — independientemente de si están ocultos
  const campos = [
    'tipoPerfil', 'nombreCompleto', 'cuil', 'fechaNacimiento', 'telefono', 'email',
    'provincia', 'localidad', 'calle', 'numero', 'piso', 'dpto', 'barrio',
    'referido', 'nombreReferente', 'tieneConocidos', 'nombreConocido',
    'trabajoCalycon', 'motivoBaja', 'experienciaStellantis', 'modalidad', 'nombreEmpresa',
    'oficioPrincipal', 'puestoInteres', 'anosExperiencia',
    'nivelEducativo', 'tituloProfesional', 'profesion', 'disponibilidadHoraria', 'tipoLicencia'
  ];

  campos.forEach(function(nombre) {
    const el = form.elements[nombre];
    if (!el) return;

    // Radio buttons — buscar el seleccionado
    if (el.length && el[0] && el[0].type === 'radio') {
      const checked = form.querySelector('input[name="' + nombre + '"]:checked');
      datos[nombre] = checked ? checked.value : '';
    }
    // Select o input/textarea normales
    else if (el.value !== undefined) {
      datos[nombre] = el.value || '';
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
      reader.onload = function (e) {
        const base64 = e.target.result.split(',')[1];
        resolve({ campo: nombre, nombre: file.name, tipo: file.type, base64: base64 });
      };
      reader.onerror = function () { reject(new Error('No se pudo leer el archivo ' + nombre)); };
      reader.readAsDataURL(file);
    });
  });
  return Promise.all(promesas);
}

// ── Mostrar mensaje (compatibilidad) ─────────────────────────────────────────

function mostrarMensaje(container, tipo, texto) {
  const colores = {
    success: { fondo: '#d4edda', borde: '#28a745', texto: '#155724' },
    error:   { fondo: '#f8d7da', borde: '#dc3545', texto: '#721c24' }
  };
  const c = colores[tipo];
  container.innerHTML =
    '<div style="padding:16px 20px; margin:20px 0; border-radius:8px; ' +
    'background:' + c.fondo + '; border:1px solid ' + c.borde + '; ' +
    'color:' + c.texto + '; font-size:15px; font-weight:500;">' + texto + '</div>';
}
