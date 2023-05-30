// // FLAGS


// const flags= document.querySelectorAll('.flags');

// // Recorre cada elemento y agrega un evento de clic
// flags.forEach(flag => {
// 	flag.addEventListener('click', () => {
// 		// Remueve la clase 'active' de todos los elementos
// 		flags.forEach(f => f.classList.remove('active'));

// 		// Agrega la clase 'active' solo al elemento actual
// 		flag.classList.add('active');
// 	});
// });

const flags = document.getElementById('flags');

flags.addEventListener('click', function() {
  this.focus();
});
