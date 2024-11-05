# Proyecto Integrador: CRUD con Node.js y MySQL

# Plataforma de Streaming

Este proyecto es una **plataforma de streaming** desarrollada con **Node.js** y **MySQL**, que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos relacional. La aplicación ofrece una estructura para manejar **contenidos**, **categorías**, **actores**, y **géneros**, ideal para gestionar una biblioteca multimedia.

En este

## Contenidos

- [Características](#características)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)

## Características

- CRUD completo para gestionar la plataforma TrailerFlix.
- Integración de una base de datos relacional MySQL.
- Funcionalidad para Crear, Buscar, Actualizar y Eliminar asociaciones de contenido con actores, géneros y categorias.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 5.7 o superior)
- [Postman](https://www.postman.com/) (opcional, para probar los endpoints de la API)

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/JulianPoltro/CRUD-Sequelize.git
   cd CRUD-Sequelize
   ```

2. **Instala las dependencias**:

   ```bash
   npm i express sequelize mysql2 dotenv cross-env swagger-ui-express swagger-jsdoc
   ```

   - express: Framework web para Node.js, usado para manejar rutas y servidores HTTP.
   - sequelize: ORM (Object-Relational Mapping) que facilita la interacción con bases de datos SQL.
   - mysql2: Cliente MySQL para Node.js, necesario para que Sequelize se conecte a una base de datos MySQL.
   - dotenv: Para gestionar variables de entorno, como claves de API o credenciales de base de datos.
   - cross-env: Utilizado para establecer variables de entorno de manera consistente entre plataformas (Windows, Linux, macOS).
   - swagger-ui-express: Middleware para integrar Swagger UI y documentar las APIs de forma visual.
   - swagger-jsdoc: Utilizado para generar la especificación Swagger (en formato JSON) a partir de comentarios en el código fuente.

3. **Configura la base de datos**:

   - Crea una base de datos en MySQL Workbench ejecutando el archivo que se encuentra dentro de la carpeta SQL

   ```plaintext
      SQL/
      ├── Crear Tablas trailerflix.sql          # Archivo SQL para crear el schema necesario
      └── Realizar INSERTS trailerflix.sql      # Realiza los inserts a las tablas creado en base al json proporcionado 
   ```

   ![SQL/db_designer/trailerflix_1.png](https://github.com/JulianPoltro/CRUD-Sequelize/blob/main/SQL/db_designer/trailerflix_1.png)

   - Actualiza o Crea el archivo `.env` con tus credenciales:
     ```
      DATABASE = trailerflix
      DBUSER = USER
      PASSWORD = PASSWORD
      HOST = localhost
     ```

## Ejecución

Inicia la aplicación en modo de desarrollo:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

Puedas instalar la extension REST Client para hacer las solicitudes HTPP desde el archivo api.http desde VS Code

## Estructura del Proyecto

```plaintext
├── controllers/           # Controladores con la logica del proyecto para manejar los EndPonits
├── models/                # Modelos de la base de datos (Contenido, Actores, Categorias, Generos)
├── routes/                # Definición de las rutas de la API
├── SQL/                   # Configuración de la base de datos
└── app.js                 # Ejecucion del servidos e inicio de la app
```

## Endpoints de la API

### Contenidos

- **POST /**: Crear un nuevo contenido.
- **GET /**: Listar todos los contenidos.
- **GET /:id**: Obtener contenido por ID.
- **GET /filter/titulo?titulo=**: Obtener contenido por Titulo.
- **GET /filter/categoria?categoria=**: Obtener contenido por Categoria (Película o Serie).
- **GET /filter/genero?genero=**: Obtener contenido por Genero.
- **PUT /:id**: Actualizar contenido por ID.
- **DELETE /:id**: Eliminar contenido por ID.
