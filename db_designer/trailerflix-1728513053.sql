CREATE TABLE IF NOT EXISTS `contenido` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`Poster` varchar(255) NOT NULL,
	`Titulo` varchar(255) NOT NULL,
	`Categoria_ID` varchar(255) NOT NULL,
	`Genero_ID` varchar(255) NOT NULL,
	`Gen` varchar(255) NOT NULL,
	`Busqueda` varchar(255) NOT NULL,
	`Resumen` varchar(255) NOT NULL,
	`Temporadas` int NOT NULL,
	`Reparto` varchar(255) NOT NULL,
	`Trailer` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `actores` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`Nombre` varchar(255) NOT NULL,
	`Fecha_Nacimiento` date NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categoria` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nombre` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `genero` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nombre` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `contenido_actores` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`Contenido_ID` int NOT NULL,
	`Actor_ID` int NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk3` FOREIGN KEY (`Categoria_ID`) REFERENCES `categoria`(`id`);

ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk4` FOREIGN KEY (`Genero_ID`) REFERENCES `genero`(`id`);



ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk1` FOREIGN KEY (`Contenido_ID`) REFERENCES `contenido`(`id`);

ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk2` FOREIGN KEY (`Actor_ID`) REFERENCES `actores`(`id`);