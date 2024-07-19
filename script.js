document.addEventListener('DOMContentLoaded', function() {
  var openBtn = document.getElementById('openPopup');
  var popupContainer = document.getElementById('popupContainer');
  var popupFrame = document.getElementById('popupFrame');

  popupContainer.style.display = 'none';

  openBtn.onclick = function(e) {
    e.preventDefault();
    popupFrame.src = 'appPage/app.html';
    popupContainer.style.display = 'block';
  }

  function closePopup() {
    popupContainer.style.display = 'none';
    popupFrame.src = '';
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePopup();
    }
  });

  window.onclick = function(event) {
    if (event.target == popupContainer) {
      closePopup();
    }
  }
});