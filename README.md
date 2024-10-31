# Proyecto Integrador: CRUD con Node.js y MySQL

# Plataforma de Streaming

Este proyecto es una **plataforma de streaming** desarrollada con **Node.js** y **MySQL**, que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos relacional. La aplicación ofrece una estructura para manejar **contenidos**, **categorías**, **actores**, y **géneros**, ideal para gestionar una biblioteca multimedia.

## Contenidos

- [Características](#características)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Contribuciones](#contribuciones)

## Características

- CRUD completo para gestionar la plataforma TrailerFlix, categorías, géneros y reparto.
- Integración de una base de datos relacional MySQL.
- Funcionalidad para agregar, actualizar y eliminar asociaciones de contenido con actores y géneros.
- Búsqueda de contenidos por categoría y otros atributos.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 5.7 o superior)
- [Postman](https://www.postman.com/) (opcional, para probar los endpoints de la API)

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/JulianPoltro/Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF.git
   cd Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF
   ```

2. **Instala las dependencias**:

   ```bash
   npm install express sequelize mysql2
   ```

3. **Configura la base de datos**:

   - Crea una base de datos en MySQL Workbench ejecutando el archivo que se encuentra dentro de la carpeta SQL

   ```plaintext
      SQL/
      ├── Crear Tablas trailerflix.sql          # Archivo SQL para crear las tablas necesarias
      └── Realizar INSERTS trailerflix.sql      # Realiza los inserts a las tablas creado en base a json
   ```

   - Actualiza el archivo `.env` con tus credenciales:
     ```
      DATABASE = trailerflix
      DBUSER = USER
      PASSWORD = PASSWORD
      HOST = localhost
     ```

## Ejecución

Inicia la aplicación en modo de desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

## Estructura del Proyecto

```plaintext
├── controllers/           # Lógica de negocio para cada modelo
├── models/                # Modelos de la base de datos (Contenido, Actores, Categorias, Generos)
├── routes/                # Definición de las rutas de la API
├── SQL/                # Configuración de la base de datos y otros servicios
└── app.js                 # Punto de entrada de la aplicación
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
