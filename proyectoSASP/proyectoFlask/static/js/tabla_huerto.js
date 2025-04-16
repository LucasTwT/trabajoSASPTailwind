const seccionesHuerto = document.querySelectorAll('.seccionHuerto');

seccionesHuerto.forEach(seccion => {
  const texto = seccion.textContent.trim().toLowerCase();

  if (texto === "sano") {
    // Verde pastel
    seccion.style.backgroundColor = '#a7d7a7';
    seccion.style.color = '#234d23';
  } else {
    // Rojo pastel
    seccion.style.backgroundColor = '#f2a7a7';
    seccion.style.color = '#5b1f1f';
  }
});
