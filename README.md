# Deliah Resto
Es un aplicación de servicio backend, con Node.js y MySQL

## Instalación
- Clona el repositorio en tú máquina local
- Este proyecto utiliza una instancia de MySQL remota en remotemysql.com, por lo que no tiene que instalar MySQL
- Para acceder a (https://remotemysql.com/phpmyadmin/) ingrese el Usuario 'V9Jz5fm5ia', la contraseña se encuenta en el archivo config.json dentro de la carpeta config.

Instalar las dependencias
```bash
    npm install
```

Iniciar el servidor con nodemon
```bash
    npm run dev
```
## Como usar
- Importe la colección de APIS a postman (https://www.getpostman.com/collections/131ab3157c5512690fa2), en estas ya se encuentran configuradas algunas de las variables necesarias, para loguearse como administador puede usar los datos 'admin@admin.com - pass: 123545' o registrarse con el rol 'admin' para cada solicitud deberá ingresar el Token que se genera al loguearse en el Header de la solicitud.