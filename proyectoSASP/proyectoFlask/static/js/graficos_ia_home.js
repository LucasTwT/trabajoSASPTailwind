function isDarkMode() {
    return document.documentElement.classList.contains('dark');
}

function actualizarTemaDelGrafico(chart) {
    const dark = isDarkMode();

    chart.options.scales.x.ticks.color = dark ? '#fff' : '#000';
    chart.options.scales.y.ticks.color = dark ? '#fff' : '#000';

    chart.options.scales.x.grid.color = dark ? '#ffffff10' : '#00000010';
    chart.options.scales.y.grid.color = dark ? '#ffffff20' : '#00000020';

    chart.options.scales.x.title.color = dark ? '#fff' : '#000';
    chart.options.scales.y.title.color = dark ? '#fff' : '#000';

    chart.options.plugins.legend.labels.color = dark ? '#fff' : '#000';
    chart.options.plugins.title.color = dark ? '#fff' : '#000';
    chart.options.plugins.subtitle.color = dark ? '#ccc' : '#333';

    chart.options.plugins.tooltip.backgroundColor = dark ? '#000000dd' : '#ffffffdd';
    chart.options.plugins.tooltip.titleColor = dark ? '#00BCD4' : '#00796B';
    chart.options.plugins.tooltip.bodyColor = dark ? '#fff' : '#000';
    chart.options.plugins.tooltip.borderColor = dark ? '#ffffff30' : '#00000030';

    chart.update();
}

document.getElementById('modoToggle').addEventListener('click', () => {
    localStorage.setItem('theme', isDarkMode() ? 'dark' : 'light');
    setTimeout(() => {
        actualizarTemaDelGrafico(miGrafico);
    }, 300); // delay si hay animación de clase
});


const data = [
[0.12487854808568954, 0.004765782505273819, 0.007114121224731207, 0.13026493787765503, 0.0019127886043861508, 0.0057252454571425915, 0.004931269679218531, 0.004614181350916624, 0.000619191734585911, 0.0004418059252202511],
[0.031215475872159004, 0.0630180686712265, 0.020496340468525887, 0.9303879737854004, 0.04967345669865608, 0.2722187638282776, 0.02827783301472664, 0.02319112978875637, 0.09756802767515182, 0.01248331367969513],
[0.34542983770370483, 0.5946436524391174, 0.18995033204555511, 0.26170825958251953, 0.030434930697083473, 0.18661761283874512, 0.04132185876369476, 0.0256153866648674, 0.1643196940422058, 0.01733393408358097, 0.34764885902404785, 0.007023761980235577, 0.057723209261894226, 0.026522619649767876, 0.0017239800654351711, 0.02283821627497673, 0.013473834842443466, 0.135883629322052, 0.05797616392374039, 0.01152768824249506]
];

const ctx = document.getElementById('trainingChart').getContext('2d');

// Configuración de animaciones personalizadas
Chart.defaults.animation.duration = 2000;
Chart.defaults.elements.line.tension = 0.4;

// Plugin personalizado para efecto de brillo
const glowPlugin = {
id: 'glow',
afterDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        if (meta.hidden) return;
        
        // Efecto de subrayado con gradiente
        ctx.beginPath();
        meta.data.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });
        
        const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
        gradient.addColorStop(0, dataset.borderColor + '80');
        gradient.addColorStop(1, dataset.borderColor + '00');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 15;
        ctx.stroke();
    });
    ctx.restore();
}
};

const miGrafico = new Chart(ctx, {
type: 'line',
plugins: [glowPlugin],
data: {
    labels: data[0].map((_, i) => `Época ${i + 1}`),
    datasets: [
        {
            label: 'ResNet-18(Peppers) (10 épocas)',
            data: data[0],
            borderColor: '#00BCD4',
            backgroundColor: '#00BCD433',
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#00BCD4',
            fill: false
        },
        {
            label: 'ResNet-18(Potatos) (10 épocas)',
            data: data[1],
            borderColor: '#FF9800',
            backgroundColor: '#FF980033',
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FF9800',
            fill: false
        },
        {
            label: 'ResNet-18(Tomatos) (20 épocas)',
            data: data[2],
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF5033',
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#4CAF50',
            fill: false
        }
    ]
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            title: {
                display: true,
                text: 'Pérdida',
                color: '#fff',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            grid: {
                color: '#ffffff20'
            },
            ticks: {
                color: '#fff'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Épocas de Entrenamiento',
                color: '#fff',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            grid: {
                color: '#ffffff10'
            },
            ticks: {
                color: '#fff',
                maxTicksLimit: 10
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: '#fff',
                font: {
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: '#000000dd',
            titleColor: '#00BCD4',
            bodyColor: '#fff',
            borderColor: '#ffffff30',
            borderWidth: 1,
            cornerRadius: 5
        },
        title: {
            display: true,
            text: 'Comparación de Entrenamiento de Modelos ResNet-18',
            color: '#fff',
            font: {
                size: 18,
                weight: 'bold'
            },
            padding: {
                top: 10,
                bottom: 20
            }
        },
        subtitle: {
            display: true,
            text: 'Reconocimiento de Enfermedades en Plantas',
            color: '#ffffffff',
            font: {
                size: 14,
                weight: 'italic'
            }
        }
    },
    transitions: {
        show: {
            animations: {
                x: {
                    from: 0
                },
                y: {
                    from: 0
                }
            }
        },
        hide: {
            animations: {
                x: {
                    to: 0
                },
                y: {
                    to: 0
                }
            }
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false
    }
}
});

// Animación adicional de carga
document.querySelectorAll('.chart-container').forEach(container => {
container.style.opacity = '0';
container.style.transform = 'translateY(20px)';

setTimeout(() => {
    container.style.transition = 'all 1s ease-out';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
}, 500);
});