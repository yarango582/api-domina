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


# Microservicio de Lista de Tareas


Este es un microservicio que permite crear, actualizar y eliminar tareas de una lista de tareas. Utiliza Express como framework web y MongoDB como base de datos.

## Instalación
Para utilizar este microservicio, es necesario tener instalado Node.js y MongoDB en su sistema. También necesitará un archivo .env en la raíz del proyecto con la URL de conexión a su base de datos MongoDB.

Una vez que haya clonado o descargado este repositorio, ejecute los siguientes comandos en la terminal:

```
cd task-service
npm install
npm start
```

Esto instalará las dependencias y ejecutará el servidor en el puerto 3001.

## Uso

El microservicio tiene los siguientes endpoints:

`POST /tasks`

Crea una nueva tarea en la lista.

Parámetros

  * userId - string
  * title - string
  * description - string


## Respuesta
Si la tarea se crea correctamente, la respuesta será un objeto JSON con la propiedad id que contiene el ID de la tarea recién creada.

Si falta algún parámetro o se produce un error al crear la tarea, la respuesta tendrá un código de estado HTTP 400 y un objeto JSON con la propiedad message que describe el error.

`PUT /tasks/:id`

Actualiza una tarea existente en la lista.

Parámetros

* id - string
* title - string
* description - string


Respuesta
Si la tarea se actualiza correctamente, la respuesta será un objeto JSON con la propiedad message que indica que la tarea se actualizó correctamente.

Si la tarea no se encuentra o se produce un error al actualizar la tarea, la respuesta tendrá un código de estado HTTP 404 y un objeto JSON con la propiedad message que describe el error.

`DELETE /tasks/:id`

Elimina una tarea de la lista.

Parámetros

* id - string


Respuesta
Si la tarea se elimina correctamente, la respuesta será un objeto JSON con la propiedad message que indica que la tarea se eliminó correctamente.

Si la tarea no se encuentra o se produce un error al eliminar la tarea, la respuesta tendrá un código de estado HTTP 404 y un objeto JSON con la propiedad message que describe el error.


## Licencia
Este proyecto está licenciado bajo la Licencia MIT.