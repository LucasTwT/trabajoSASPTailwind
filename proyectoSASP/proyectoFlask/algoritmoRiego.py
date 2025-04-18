import json
import requests

api_key = "3d208747e3095b645933ba83d8156fed"
lat = 40.119646
lon = -3.664446

url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"

respuesta = requests.get(url)
data_clima = respuesta.json()

with open("Data/clima.json", "w") as archivo:
    json.dump(data_clima, archivo)


def calcular_riego(tipo_planta,humedad, temp, lluvia_1h, esta_lloviendo):
    # Parámetros técnicos según FAO para riego agrícola
    plantas_disponibles = [
        {"tipo": "Tomatos", "requerimientos": {'humedad': 92, 'temperatura': 25}, "clases": 10},
        {"tipo": "Peppers", "requerimientos": {'humedad': 92, 'temperatura': 25}, "clases": 2},
        {"tipo": "Potatos", "requerimientos": {'humedad': 75, 'temperatura': 25}, "clases": 3}
    ]

    # Encontrar la planta
    planta_actual = None
    for planta in plantas_disponibles:
        if planta["tipo"] == tipo_planta:
            planta_actual = planta
            break
    
    if not planta_actual:
        raise ValueError(f"Planta no reconocida: {tipo_planta}")

    # Umbrales específicos
    humedad_requerida = planta_actual["requerimientos"]["humedad"]
    temp_alerta = planta_actual["requerimientos"]["temperatura"]
    lluvia_minima = 5  # Puedes mover esto a cada planta si es necesario

    razones = []
    problemas = []
    regar = False
    
    # 1. Verificar lluvia actual
    if esta_lloviendo:
        razones.append("Precipitación en curso")
        return False, razones
    
    # 2. Ajustar humedad crítica por temperatura
    humedad_ajustada = humedad_requerida
    if temp > temp_alerta:
        humedad_ajustada += 5
        razones.append(f"Temperatura elevada ({temp}°C)")
        problemas.append("0") # temperatura incorrecta
    
    # 3. Lógica principal de riego
    if humedad < humedad_ajustada:
        razones.append(f"Humedad del suelo crítica ({humedad}% < {humedad_ajustada}%)")
        problemas.append("1") # humedad incorrecta
        regar = True
    
    # 4. Considerar lluvia reciente
    if lluvia_1h >= lluvia_minima:
        razones.append(f"Lluvia reciente ({lluvia_1h}mm/m²)")
        regar = False
    
    # 5. Seguridad contra exceso de agua
    if humedad > humedad_requerida + 10:
        razones.append("Suelo sobresaturado")
        regar = False
    
    return regar, razones, problemas

# Cargar datos
with open('Data/clima.json', 'r') as f:
    datos = json.load(f)

# Extraer variables
esta_lloviendo = datos.get('weather', [{}])[0].get('main') == 'Rain'
# humedad = datos.get('main', {}).get('humidity', 0)
# temp = datos.get('main', {}).get('temp', 20)
lluvia_1h = datos.get('rain', {}).get('1h', 0)

# # Calcular decisión
# decision, razones = calcular_riego(humedad, temp, lluvia_1h, esta_lloviendo)

# Generar output
def exportar_json(decision, razones, temp, humedad, path, nombre):
    resultado = {
        "riego_requerido": decision,
        "parametros": {
            "humedad_suelo": humedad,
            "temperatura": temp,
            "lluvia_1h": lluvia_1h
        },
        "razones": razones,
        "alerta_meteorologica": esta_lloviendo
    }
    with open(f'{path}/dataRiego{nombre}.json', 'w') as f:
        json.dump(resultado, f, indent=4, ensure_ascii=False)