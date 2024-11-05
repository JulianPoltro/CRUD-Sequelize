CREATE SCHEMA IF NOT EXISTS trailerflix
DEFAULT CHARACTER SET utf8mb4;
USE trailerflix;

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS actores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS contenido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poster VARCHAR(255),
    titulo VARCHAR(255) NOT NULL,
    busqueda TEXT,
    resumen TEXT,
    temporadas VARCHAR(5) NULL DEFAULT 'N/A',
    trailer VARCHAR(255),
    categoria_id INT NOT NULL,
    duracion INT,
    FOREIGN KEY (categoria_id)
        REFERENCES categorias (id)
);

CREATE TABLE IF NOT EXISTS contenido_generos (
    contenido_id INT,
    genero_id INT,
    PRIMARY KEY (contenido_id , genero_id),
    FOREIGN KEY (contenido_id)
        REFERENCES contenido (id),
    FOREIGN KEY (genero_id)
        REFERENCES generos (id)
);

CREATE TABLE IF NOT EXISTS contenido_actores (
    contenido_ID INT,
    actor_ID INT,
    PRIMARY KEY (actor_ID , contenido_ID),
    FOREIGN KEY (contenido_ID)
        REFERENCES contenido (id),
    FOREIGN KEY (actor_ID)
        REFERENCES actores (id)
);