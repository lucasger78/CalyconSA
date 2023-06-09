// // FLAGS

// const flags = document.querySelectorAll(".flags-ar, .flags-br, .flags-gb");

// flags.forEach((flag) => {
//   flag.addEventListener("click", () => {
//     // Eliminar la clase "hovered" de todos los elementos
//     flags.forEach((flag) => flag.classList.remove("hovered"));
//     // Agregar la clase "hovered" al elemento seleccionado
//     flag.classList.add("hovered");

//   });
// });

const flags = document.querySelectorAll(".flags-ar, .flags-br, .flags-gb");

const selectFlag = (flag) => {
  // Eliminar la clase "hovered" de todos los elementos
  flags.forEach((flag) => flag.classList.remove("hovered"));
  // Agregar la clase "hovered" al elemento seleccionado
  flag.classList.add("hovered");

  // Almacenar la selección de la bandera en el almacenamiento local del navegador
  localStorage.setItem("selectedFlag", flag.dataset.language);
};

const loadFlag = () => {
  // Obtener la bandera seleccionada almacenada en el almacenamiento local del navegador
  const selectedFlag = localStorage.getItem("selectedFlag");

  if (selectedFlag) {
    // Buscar el elemento de bandera correspondiente a la selección almacenada
    const flagElement = document.querySelector(`[data-language="${selectedFlag}"]`);
    if (flagElement) {
      flagElement.classList.add("hovered");
    }
  }
};

flags.forEach((flag) => {
  flag.addEventListener("click", () => {
    selectFlag(flag);
  });
});

// Cargar la bandera al cargar la página
loadFlag();

//LOGO NORMAS ISO
// let prevScrollPos = window.pageYOffset; // Variable para almacenar la posición de desplazamiento anterior

// window.addEventListener('scroll', function() {
//   let currentScrollPos = window.pageYOffset; // Obtener la posición de desplazamiento actual
//   let logo = document.querySelector('.iso-logo');

//   if (currentScrollPos > prevScrollPos) {
//     // Desplazamiento hacia abajo
//     logo.classList.add('hidden');
//   } else {
//     // Desplazamiento hacia arriba
//     logo.classList.remove('hidden');
//   }

//   prevScrollPos = currentScrollPos; // Actualizar la posición de desplazamiento anterior
// });

let prevScrollPos = window.pageYOffset; // Variable para almacenar la posición de desplazamiento anterior

window.addEventListener('scroll', function() {
  let currentScrollPos = window.pageYOffset; // Obtener la posición de desplazamiento actual
  let logo = document.querySelector('.iso-logo');
  let navbarCollapse = document.querySelector('.navbar-collapse');

  if (currentScrollPos > prevScrollPos || navbarCollapse.classList.contains('show')) {
    // Desplazamiento hacia abajo o menú desplegado en versión móvil
    logo.style.opacity = '0'; // Ocultar el elemento cambiando la opacidad a 0
  } else {
    // Desplazamiento hacia arriba
    logo.style.opacity = '1'; // Mostrar el elemento cambiando la opacidad a 1
  }

  prevScrollPos = currentScrollPos; // Actualizar la posición de desplazamiento anterior
});

//OCULTAR CUANDO DESPLIEGA MENU EN MOBILE
let navbarToggle = document.querySelector('.navbar-toggler');
let logo = document.querySelector('.iso-logo');

navbarToggle.addEventListener('click', function() {
  if (window.innerWidth <= 767) {
    logo.classList.toggle('hidden'); // Alternar la visibilidad del elemento en la versión móvil cuando se hace clic en el botón de alternar
  }
});



