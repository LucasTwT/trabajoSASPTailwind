import json
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import MaxNLocator

plt.rcParams['font.family'] = 'DejaVu Sans'  # Fuente más moderna

def carga_de_datos(ruta: str, nombres: list) -> tuple:
    datos = []
    for nombre in nombres:
        with open(f'{ruta}/resTrain{nombre}.json', 'r') as f:
            datos.append(json.load(f))
    return datos

def estilo_grafico(ax, titulo):
    ax.set_facecolor('#f0f0f0')
    ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.7)
    ax.set_title(titulo, fontsize=12, fontweight='bold', pad=20)
    ax.set_xlabel('Épocas de Entrenamiento', fontsize=10)
    ax.set_ylabel('Pérdida (BCELoss)', fontsize=10)
    ax.xaxis.set_major_locator(MaxNLocator(integer=True))
    ax.tick_params(axis='both', which='major', labelsize=9)

def main() -> None:
    # Configuración general de estilo
    with plt.style.context('seaborn-v0_8-darkgrid'):
        modelos = ['Pepper', 'Potatos', 'Tomatos']
        colores = ['#FF6B6B', '#4ECDC4', '#556270']
        datos = carga_de_datos(r'proyectoSASP\proyectoFlask\out', modelos)
        print(datos)
        
        for idx, (resultados, nombre, color) in enumerate(zip(datos, modelos, colores)):
            epochs = np.arange(1, len(resultados)+1)
            
            fig, ax = plt.subplots(figsize=(10, 5), dpi=100)
            ax.plot(epochs, resultados, 
                    color=color, 
                    linewidth=2,
                    marker='o',
                    markersize=6,
                    markerfacecolor='white',
                    markeredgecolor=color)
            
            # Mejor época
            min_loss_idx = np.argmin(resultados)
            ax.scatter(min_loss_idx+1, resultados[min_loss_idx],
                       color='red', 
                       zorder=5,
                       s=100,
                       edgecolor='black',
                       label=f'Mínima pérdida: {resultados[min_loss_idx]*100:.4f}')
            
            estilo_grafico(ax, f'Modelo {nombre} - Evolución de la Pérdida')
            ax.legend(loc='upper right', fontsize=9)

            # Guardar individualmente
            fig.savefig(f'proyectoSASP/proyectoFlask/static/imgs/perdida_{nombre.lower()}.png', dpi=300, bbox_inches='tight')
        
        # Gráfico comparativo
        fig2, ax2 = plt.subplots(figsize=(12, 6), dpi=100)
        
        for resultados, nombre, color in zip(datos, modelos, colores):
            epochs = np.arange(1, len(resultados)+1)
            ax2.plot(epochs, resultados,
                     color=color,
                     linewidth=2,
                     alpha=0.8,
                     label=nombre)
            
            # Suavizado de línea
            x_new = np.linspace(1, len(resultados), 300)
            y_smooth = np.interp(x_new, epochs, resultados)
            ax2.plot(x_new, y_smooth, color=color, linestyle='--', alpha=0.5)
        
        estilo_grafico(ax2, 'Comparativa de Pérdidas entre Modelos')
        ax2.legend(title='Modelos:', title_fontsize=10, fontsize=9)
        ax2.set_yscale('log')  # Escala logarítmica para mejor visualización
        
        # Añadir texto decorativo
        fig2.text(0.5, 0.93, 'Análisis Comparativo de Entrenamiento', 
                  ha='center', va='center', 
                  fontsize=14, fontweight='bold', color='#2c3e50')
        
        plt.tight_layout()
        
        # Guardar gráfico comparativo
        fig2.savefig('proyectoSASP/proyectoFlask/static/imgs/comparativa_perdidas.png', bbox_inches='tight')
        
        plt.show()


if __name__ == '__main__':
    main()