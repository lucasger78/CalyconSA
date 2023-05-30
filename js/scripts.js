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



