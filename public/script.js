const apiUrl = 'http://localhost:3001/juegos';

// Función para cargar la lista de juegos
async function cargarJuegos() {
  const response = await fetch(apiUrl);
  const juegos = await response.json();
  const juegosLista = document.getElementById('juegos-lista');
  juegosLista.innerHTML = ''; // Limpiar la lista antes de agregar los juegos

  juegos.forEach(juego => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${juego.titulo}</strong> - ${juego.Desarrolladora} 
      <em>(${juego["Fecha-Lanzamiento"]})</em> - 
      <span>${juego.Plataformas.join(', ')}</span>
      <button onclick="eliminarJuego('${juego.titulo}')">Eliminar</button>
    `;
    juegosLista.appendChild(li);
  });
}

// Función para agregar un nuevo juego
document.getElementById('formAddJuego').addEventListener('submit', async (event) => {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const desarrolladora = document.getElementById('desarrolladora').value;
  const fechaLanzamiento = document.getElementById('fechaLanzamiento').value;
  const plataformas = document.getElementById('plataformas').value.split(',');

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      Desarrolladora: desarrolladora,
      "Fecha-Lanzamiento": fechaLanzamiento,
      Plataformas: plataformas,
    }),
  });

  if (response.ok) {
    alert('Juego añadido correctamente');
    cargarJuegos(); // Recargar la lista de juegos
  } else {
    alert('Error al añadir el juego');
  }
});

// Función para actualizar un juego
document.getElementById('formUpdateJuego').addEventListener('submit', async (event) => {
  event.preventDefault();
  const tituloActual = document.getElementById('tituloActual').value;
  const tituloNuevo = document.getElementById('tituloNuevo').value;
  const desarrolladoraNueva = document.getElementById('desarrolladoraNueva').value;
  const fechaLanzamientoNueva = document.getElementById('fechaLanzamientoNueva').value;
  const plataformasNuevas = document.getElementById('plataformasNuevas').value.split(',');

  const response = await fetch(`${apiUrl}/${tituloActual}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo: tituloNuevo,
      Desarrolladora: desarrolladoraNueva,
      "Fecha-Lanzamiento": fechaLanzamientoNueva,
      Plataformas: plataformasNuevas,
    }),
  });

  if (response.ok) {
    alert('Juego actualizado correctamente');
    cargarJuegos(); // Recargar la lista de juegos
  } else {
    alert('Error al actualizar el juego');
  }
});

// Función para eliminar un juego
async function eliminarJuego(titulo) {
  const response = await fetch(`${apiUrl}/${titulo}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Juego eliminado correctamente');
    cargarJuegos(); // Recargar la lista de juegos
  } else {
    alert('Error al eliminar el juego');
  }
}

// Cargar los juegos al cargar la página
window.onload = cargarJuegos;
