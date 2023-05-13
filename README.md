# api-domina

## Content

* [auth-service]
* [task-service]


# Microservicio de autenticación de usuarios
Este microservicio permite registrar y autenticar usuarios en una base de datos MongoDB utilizando Node.js y Express.

## Instalación
Clonar el repositorio o descargar el código fuente.

Instalar las dependencias utilizando npm:

```
npm install express mongodb bcrypt dotenv
```
Crear un archivo .env en el directorio raíz del proyecto y agregar las siguientes variables de entorno:

```
MONGO_URL=<URL de la base de datos MongoDB>
DB_NAME=<nombre de la base de datos>
COLLECTION_NAME=<nombre de la colección>
```

## Uso
Para iniciar el servidor, ejecutar el siguiente comando:

```
node index.js
```

El servidor estará escuchando en el puerto 3000. Para registrar un nuevo usuario, hacer una petición POST a la ruta /register con los siguientes parámetros en el cuerpo de la solicitud:

```
{
  "username": "nombre de usuario",
  "email": "correo electrónico",
  "password": "contraseña"
}
```

Para autenticar un usuario, hacer una petición POST a la ruta /login con los siguientes parámetros en el cuerpo de la solicitud:

```
{
  "email": "correo electrónico",
  "password": "contraseña"
}
```

Contribuciones
Las contribuciones son bienvenidas. Si encuentra un problema o tiene una sugerencia de mejora, por favor abra un problema o envíe una solicitud de extracción.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.