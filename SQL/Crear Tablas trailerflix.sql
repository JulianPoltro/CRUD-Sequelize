CREATE SCHEMA IF NOT EXISTS trailerflix
DEFAULT CHARACTER SET utf8mb4;
USE trailerflix;

CREATE TABLE IF NOT EXISTS Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Actores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS Contenido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poster VARCHAR(255),
    titulo VARCHAR(255) NOT NULL,
    busqueda TEXT,
    resumen TEXT,
    temporadas VARCHAR(5),
    trailer VARCHAR(255),
    categoria_id INT,
    duracion INT,
    FOREIGN KEY (categoria_id)
        REFERENCES Categorias (id)
);

CREATE TABLE IF NOT EXISTS Contenido_Generos (
    contenido_id INT,
    genero_id INT,
    PRIMARY KEY (contenido_id , genero_id),
    FOREIGN KEY (contenido_id)
        REFERENCES Contenido (id),
    FOREIGN KEY (genero_id)
        REFERENCES Generos (id)
);

CREATE TABLE IF NOT EXISTS Contenido_Actores (
    contenido_ID INT,
    actor_ID INT,
    PRIMARY KEY (actor_ID , contenido_ID),
    FOREIGN KEY (contenido_ID)
        REFERENCES Contenido (id),
    FOREIGN KEY (actor_ID)
        REFERENCES Actores (id)
);