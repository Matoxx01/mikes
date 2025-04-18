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