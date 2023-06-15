// // FLAGS

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

// // Inicializar el carrusel de logos en móvil
const swiperMobile = new Swiper('.swiper-clients-mobile', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
});

// Inicializar el carrusel de logos en escritorio
const swiperDesktop = new Swiper('.swiper-clients-desktop', {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
});











