# Ejercicio Tasa de Cambio
API que regresa los tipos de cambio de MXN a USD y MXN a EUR a la fecha actual de la consulta.

Para obtener los tipos de cambio se utiliza la [API de Banxico](https://www.banxico.org.mx/SieAPIRest/service/v1).

## Endpoints

### MXN a USD - GET
Retorna el tipo de cambio de pesos mexicanos a dólares. El resultado es a la fecha actual en la que se realiza la consulta.
```
http://localhost:4000/usd
```
### MXN a EUR - GET
Retorna el tipo de cambio de pesos mexicanos a euros. El resultado es a la fecha actual en la que se realiza la consulta.
```
http://localhost:4000/eur
```

## Desarrollo
No se configuró un hotreload, así que cada vez que se realicen cambios, se tiene que parar y volver a ejecutar el servidor.

### Base de datos
Se utiliza ```Postgresql``` como gestor de base de datos.

#### Nombre
La base de datos se llama ```divisas```.

#### Tabla
Se utiliza una única tabla llamada ```tipo_cambio```, la cuál cuenta con los siguientes campos:

- id
- fecha
- tipo
- cambio

#### Conexión
La configuración para establecer la conexión con la base de datos se encuentra en el archivo ```src/database.ts```