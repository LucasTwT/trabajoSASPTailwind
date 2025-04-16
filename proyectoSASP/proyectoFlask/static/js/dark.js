const btn = document.getElementById('modoToggle');
const html = document.documentElement;

// Estado inicial
if (localStorage.theme === 'dark') {
  html.classList.add('dark');
  btn.textContent = '☀️';
}

btn.addEventListener('click', () => {
  html.classList.toggle('dark');

  const darkModeActivo = html.classList.contains('dark');
  btn.textContent = darkModeActivo ? '☀️' : '🌙';

  // Guardar preferencia
  localStorage.theme = darkModeActivo ? 'dark' : 'light';
});