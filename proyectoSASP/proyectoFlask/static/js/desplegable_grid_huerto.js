document.querySelectorAll('.planta-cell').forEach(cell => {
    const info = cell.querySelector('.info-content');
    cell.addEventListener('click', () => {
      info.classList.toggle('expanded');
    });
  });