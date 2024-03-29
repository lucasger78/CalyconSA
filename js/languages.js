
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`js/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    textToChange.innerHTML = texts[section][value];
  }

  // Almacena el idioma seleccionado en el almacenamiento local del navegador
  localStorage.setItem("selectedLanguage", language);
};

const loadLanguage = () => {
  // Obtiene el idioma seleccionado almacenado en el almacenamiento local del navegador
  const selectedLanguage = localStorage.getItem("selectedLanguage");

  if (selectedLanguage) {
    changeLanguage(selectedLanguage);
  } else {
    // Establece un idioma predeterminado si no se ha seleccionado ninguno
    changeLanguage("default");
  }
};

flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

// Carga el idioma al cargar la página
loadLanguage();

// const loadLanguage = async () => {
//   // Verificar si el idioma seleccionado ya está almacenado en el almacenamiento local del navegador
//   const selectedLanguage = localStorage.getItem("selectedLanguage");

//   if (selectedLanguage) {
//     changeLanguage(selectedLanguage);
//   } else {
//     // Cargar el archivo "es.json" y almacenar su contenido en el almacenamiento local
//     const response = await fetch("es.json");
//     const languageData = await response.json();
//     localStorage.setItem("selectedLanguage", JSON.stringify(languageData));
//     changeLanguage(languageData);
//   }
// };

// flagsElement.addEventListener("click", (e) => {
//   changeLanguage(e.target.parentElement.dataset.language);
// });

// // Cargar el idioma al cargar la página
// loadLanguage();


