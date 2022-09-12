# Proyecto BACKEND para CoderHouse

## Entrega 32

### Parte 2.1 - Ver resultados en carpeta "2-1_Perfilamiento"

Script Artillery: artillery quick --count 20 -n 50 http://localhost:8080/info > archivoEjemplo.txt

Archivos,
    'ResultWithCLog_v8.txt' resultado de --> node --prof-process WithCLog_v8.log > ResultWithCLog_v8.txt (Generado por node --prof ./dist/server.js).

    'ResultWithOutCLog_v8.txt' resultado de --> node --prof-process WithOutCLog_v8.log > ResultWithOutCLog_v8.txt (Generado por node --prof ./dist/server.js).

### Parte 2.2 - Ver resultados en carpeta "2-2_inspect"

Scrip utilizado: node --inspect ./dist/server.js

*En Chrome --> chrome://inspect/#devices, start/stop.

### Parte 2.3 - Ver resultados en carpeta "2-3_Autocannon"

Configuracion package.json:

  "scripts": {
    "build": "webpack",
    "start": "0x .",
    "test": "node benchmark.js"

Script utilizado: npm start

En otra consola: npm test

## Conclusión
En resúmen, al utilizar la función console.log (función síncrona) todo el procesamiento del programa resulta mayor. Lo que repercute en la calidad del mismo. Resultando menos óptimo y eficiente.

Se puede observar como la tasa de procesamiento de requests es mucho menor, y en consecuencia el tiempo medio de respuesta por requestes mayor que en el programa que NO utiliza los console.logs.

Tras el desafio se prueba de que evitar el uso de funciones síncronas (en caso de que sea posible) como por ejemplo el console.log() tiene como resultado un programa de rendimiento más óptimo.# backend_heroku
