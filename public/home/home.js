// Evento para detectar "Enter" en el input
document.getElementById("clientSelect").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnIngresar").click();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const manageEmployeesItem = document.getElementById('manageEmployees');
  const employee = JSON.parse(localStorage.getItem('employee'));

  if (employee && employee.name) {
    showFlashMessage(`Bienvenido ${employee.name}!`, 'success');
  }

  if (employee && employee.role === 'admin') {
    manageEmployeesItem.style.display = "block";
  } else {
    manageEmployeesItem.style.display = "none";
  }

  // Toolbar
  const backBtn = document.querySelector('.toolbar-left button:nth-child(1)');
  const forwardBtn = document.querySelector('.toolbar-left button:nth-child(2)');
  const refreshBtn = document.querySelector('.toolbar-left button:nth-child(3)');
  const moreOptionsBtn = document.querySelector('.toolbar-right button');
  const moreOptionsMenu = document.getElementById('moreOptionsMenu');

  backBtn.addEventListener('click', () => window.history.back());
  forwardBtn.addEventListener('click', () => window.history.forward());
  refreshBtn.addEventListener('click', () => window.location.reload());

  moreOptionsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    moreOptionsMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    if (moreOptionsMenu.classList.contains('show')) {
      moreOptionsMenu.classList.remove('show');
    }
  });

  fetch('http://localhost:3000/client')
    .then(response => response.json())
    .then(clients => {
      const select = document.getElementById('clientSelect');
      clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener clientes:', error);
      showFlashMessage('Error al cargar clientes.', 'danger');
    });

  document.getElementById('btnIngresar').addEventListener('click', () => {
    const selectedId = document.getElementById('clientSelect').value;
    const selectedName = document.getElementById('clientSelect').selectedOptions[0].textContent;
    if (!selectedId) {
      showFlashMessage('Debes seleccionar un cliente.', 'danger');
      return;
    }

    localStorage.setItem('selectedClientId', selectedId);
    localStorage.setItem('selectedClientName', selectedName);

    window.location.href = 'nomina/nomina.html';
  });

});

// Función para mostrar mensajes flash
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
