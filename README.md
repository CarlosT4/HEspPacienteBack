# Backend-App-Paciente-Hospital-Espinar

API de la aplicacion web, realiza consultas a la base de datos de pacientes con historias clinicas del hospital de espinar.
Los datos que devuelve estan en formato JSON. 

## Herramientas 
NodeJS v20.18.3 

## Instrucciones
1. Clone el repositorio con:

```
git clone https://github.com/CarlosT4/HEspPacienteBack.git
```

2. Crea el archivo .env con estos variables
```
PORT=puerto-de-la-app-backend
DB_USER=usuario-de-la-bd
DB_PASSWORD=contrasena-de-la-bd
DB_HOST=host-de-la-bd
DB_DATABASE=nombre-de-la-bd
DB_PORT=puerto-de-la-bd
```

3. Instale las dependencias:
```
npm install
```
4. Ejecute el servidor con: 

```
npm start
```