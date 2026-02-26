// =============================================
//  Code.gs  —  Google Apps Script
//  Calycon - Formulario de Postulaciones
// =============================================

const SPREADSHEET_ID = '1vgbbFfH0Bt4HTozDUQEORp2UsO_HOLSZXjmQ9dMcthg';
const FOLDER_ID      = '1VeClBifEReMUXNlcHteXDiN-wVr6BQ3g';
const SHEET_NAME     = 'Postulaciones';

// Debe coincidir EXACTAMENTE con el orden de columnas del Sheet
const COLUMNAS = [
  'ID',                    // A
  'Fecha',                 // B
  'tipoPerfil',            // C  - Tipo Perfil
  'nombreCompleto',        // D  - Nombre Completo
  'cuil',                  // E  - CUIL
  'fechaNacimiento',       // F  - Fecha Nacimiento
  'telefono',              // G  - Teléfono
  'email',                 // H  - Email
  'provincia',             // I  - Provincia
  'localidad',             // J  - Localidad
  'calle',                 // K  - Calle
  'numero',                // L  - Número
  'piso',                  // M  - Piso
  'dpto',                  // N  - Dpto
  'barrio',                // O  - Barrio
  'referido',              // P  - Referido
  'nombreReferente',       // Q  - Nombre Referente
  'tieneConocidos',        // R  - Tiene Conocidos
  'nombreConocido',        // S  - Nombre Conocido
  'trabajoCalycon',        // T  - Trabajó Calycon
  'motivoBaja',            // U  - Motivo Baja
  'experienciaStellantis', // V  - Exp. Stellantis
  'modalidad',             // W  - Modalidad
  'nombreEmpresa',         // X  - Empresa Tercerizadora
  'oficioPrincipal',       // Y  - Oficio Principal
  'puestoInteres',         // Z  - Puesto Interés
  'anosExperiencia',       // AA - Años Experiencia
  'nivelEducativo',        // AB - Nivel Educativo
  'tituloProfesional',     // AC - Título Profesional
  'profesion',             // AD - Profesión
  'disponibilidadHoraria', // AE - Disponibilidad Horaria
  'tipoLicencia',          // AF - Tipo Licencia
  'carpetaDriveUrl'        // AG - Carpeta Drive
];

const NOMBRES_ARCHIVOS = {
  dniFrente:      'DNI_Frente',
  dniDorso:       'DNI_Dorso',
  licenciaFrente: 'Licencia_Frente',
  licenciaDorso:  'Licencia_Dorso',
  cv:             'CV'
};

function guardarError(mensaje, stack) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let logSheet = ss.getSheetByName('Errores');
    if (!logSheet) {
      logSheet = ss.insertSheet('Errores');
      logSheet.appendRow(['Fecha', 'Error', 'Stack']);
    }
    logSheet.appendRow([new Date(), mensaje, stack || '']);
  } catch(e) {}
}

function doPost(e) {
  try {
    const payload  = JSON.parse(e.postData.contents);
    const datos    = payload.datos    || {};
    const archivos = payload.archivos || [];

    const sheet = obtenerHoja();
    const id    = generarID(sheet);

    // Crear carpeta en Drive
    const nombreCarpeta = (datos.nombreCompleto || 'Sin_Nombre').replace(/\s+/g, '_') + '_' + id;
    const carpetaPadre  = DriveApp.getFolderById(FOLDER_ID);
    const carpetaPost   = carpetaPadre.createFolder(nombreCarpeta);
    const carpetaUrl    = carpetaPost.getUrl();

    // Subir archivos
    archivos.forEach(function (archivo) {
      if (!archivo || !archivo.base64) return;
      const nombreLegible = NOMBRES_ARCHIVOS[archivo.campo] || archivo.campo;
      const extension     = archivo.nombre ? '.' + archivo.nombre.split('.').pop() : '';
      const bytes = Utilities.base64Decode(archivo.base64);
      const blob  = Utilities.newBlob(bytes, archivo.tipo, nombreLegible + extension);
      carpetaPost.createFile(blob);
    });

    // Armar fila siguiendo el orden exacto de COLUMNAS
    const fila = COLUMNAS.map(function (col) {
      if (col === 'ID')              return id;
      if (col === 'Fecha')           return new Date();
      if (col === 'carpetaDriveUrl') return carpetaUrl;
      return datos[col] !== undefined ? datos[col] : '';
    });
    sheet.appendRow(fila);

    return respuesta({ status: 'ok', id: id, carpeta: carpetaUrl });

  } catch (err) {
    guardarError(err.message, err.stack);
    return respuesta({ status: 'error', message: err.message });
  }
}

function doGet() {
  return respuesta({ status: 'ok', message: 'Apps Script activo' });
}

function obtenerHoja() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('No se encontró la hoja "' + SHEET_NAME + '"');
  return sheet;
}

function generarID(sheet) {
  const hoy   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
  const datos = sheet.getDataRange().getValues();
  let count = 0;
  datos.forEach(function (fila) {
    if (String(fila[0]).startsWith('POST-' + hoy)) count++;
  });
  return 'POST-' + hoy + '-' + String(count + 1).padStart(3, '0');
}

function respuesta(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}