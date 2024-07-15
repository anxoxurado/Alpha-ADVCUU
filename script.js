document.addEventListener('DOMContentLoaded', function() {
  var openBtn = document.getElementById('openPopup');
  var popupContainer = document.getElementById('popupContainer');
  var popupFrame = document.getElementById('popupFrame');

  // Aseguramos que el popup esté oculto inicialmente
  popupContainer.style.display = 'none';

  openBtn.onclick = function(e) {
    e.preventDefault();
    popupFrame.src = 'appPage/app.html';
    popupContainer.style.display = 'block';
  }

  // Función para cerrar la ventana emergente
  function closePopup() {
    popupContainer.style.display = 'none';
    popupFrame.src = '';
  }

  // Evento para cerrar la ventana emergente con la tecla Esc
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePopup();
    }
  });

  // Opcional: mantener la funcionalidad de cerrar al hacer clic fuera de la ventana
  window.onclick = function(event) {
    if (event.target == popupContainer) {
      closePopup();
    }
  }
});