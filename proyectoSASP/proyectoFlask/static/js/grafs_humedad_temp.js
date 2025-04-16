// Obtenemos los datos del script, no del canvas
const configScript = document.getElementById('grafs');

const filas = parseInt(configScript.dataset.filas);
const columnas = parseInt(configScript.dataset.cols);
const total = filas * columnas;

const humedad = [];
const temperatura = [];
const labels = [];

async function cargarDatos() {
  for (let i = 1; i <= total; i++) {
    try {
      const res = await fetch(`/static/json/dataRiego${i}.json`);
      const json = await res.json();

      humedad.push(json.parametros.humedad_suelo);
      temperatura.push(json.parametros.temperatura);
      labels.push(`Planta ${i}`);
    } catch (err) {
      console.error(`Error al cargar dataRiego${i}.json`, err);
    }
  }

  dibujarGrafico();
}

function calcularEMA(data, periodo) {
  const k = 2 / (periodo + 1);
  const ema = [data[0]];

  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }

  return ema;
}

function dibujarGrafico() {
  const ctx = document.getElementById('graficoRiego').getContext('2d');

  const emaTemp = calcularEMA(temperatura, 4);
  const emaHumedad = calcularEMA(humedad, 4);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '🌡️ Temperatura (°C)',
          data: temperatura,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3
        },
        {
          label: '💧 Humedad Suelo (%)',
          data: humedad,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3
        },
        {
          label: '📉 EMA Temp (4)',
          data: emaTemp,
          borderColor: 'rgba(255, 159, 64, 1)',
          borderDash: [5, 5],
          tension: 0.3,
          fill: false
        },
        {
          label: '📉 EMA Humedad (4)',
          data: emaHumedad,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderDash: [5, 5],
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

cargarDatos();
