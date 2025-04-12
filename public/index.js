// Evento para detectar "Enter" en el input
document.getElementById("clave").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnIngresar").click();
  }
});

const apiUrl = 'http://localhost:3000';
 
// Evento click del botón Ingresar
document.getElementById("btnIngresar").addEventListener("click", async function() {
  const clave = document.getElementById("clave").value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: clave })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar localmente role y name
      localStorage.setItem('employee', JSON.stringify({
        role: data.role,
        name: data.name
      }));
      // Puedes redirigir o notificar al usuario que el login fue exitoso
      console.log('Ingreso exitoso:', data);
      window.location.href = 'home/home.html'; 
    } else {
      // Si la respuesta no fue ok se muestra el mensaje de error
      showFlashMessage(data.error, 'danger');
    }
  } catch (error) {
    console.error('Error en la conexión:', error);
    showFlashMessage('Error de conexión', 'danger');
  }
});

// Función para mostrar mensajes flash en la interfaz
function showFlashMessage(message, category) { 
  const flashContainer = document.getElementById('flash-messages');
  if (!flashContainer) {
      console.error('No se encontró el contenedor de mensajes flash.');
      return;
  }

  const flashMessage = document.createElement('div');
  flashMessage.className = `alert ${category}`;
  flashMessage.textContent = message;

  flashContainer.appendChild(flashMessage);

  setTimeout(() => {
      flashMessage.remove();
  }, 5000);
}