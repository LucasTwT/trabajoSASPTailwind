import json
import os

def carga_datos(path, nums):
    datos = []
    for i in range(nums):
        if i < nums:
            with open(os.path.join(path,os.listdir(path)[i])) as f:
                datos.append(json.load(f))
    return datos

def main() -> None:
    data = carga_datos(r"proyectoSASP\proyectoFlask\Data\JSONsDatosRiego", 20)
    print(data)
    print(len(data))

if __name__ == '__main__':
    main()
