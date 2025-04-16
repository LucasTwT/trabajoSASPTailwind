  const dataFromFlask = {{ data | tojson }};
  const labels = Array.from({length: dataFromFlask.length}, (_, i) => i + 1);

  const ctx = document.getElementById('graficoCNN1').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),  // Auto-generar etiquetas del 1 al 10
        datasets: [{
          label: 'Resultados CNN 2',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Rendimiento de CNN 2'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: context => `Precisión: ${context.parsed.y.toFixed(4)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Precisión'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Época'
            }
          }
        }
      }
    });
  });