const { Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../conexion/database");
const AsociacionModel = require("../models/asociacionModel");
const Contenido = require("../models/contenidos");
const Categoria = require("../models/categorias");
const Genero = require("../models/generos");
const Actor = require("../models/actores");
const ContenidoActores = require("../models/contenidoActores");
const ContenidoGeneros = require("../models/contenidoGeneros");

const getAllContenido = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      attributes: [
        "id",
        "poster",
        "titulo",
        [
          literal(`(
            SELECT c.nombre
            FROM categorias c
            WHERE c.id = Contenido.categoria_id
          )`),
          "categoria",
        ],
        [
          literal(`(
            SELECT GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ')
            FROM generos g
            INNER JOIN Contenido_Generos cg ON g.id = cg.genero_id
            WHERE cg.contenido_id = Contenido.id
          )`),
          "generos",
        ],
        "resumen",
        "temporadas",
        [
          literal(`(
            SELECT GROUP_CONCAT(a.nombre SEPARATOR ', ')
            FROM actores a
            INNER JOIN Contenido_Actores ca ON a.id = ca.actor_ID
            WHERE ca.contenido_ID = Contenido.id
          )`),
          "reparto",
        ],
        "trailer",
      ],
    });

    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "No hay contenidos para mostrar" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};

const getIdContenido = async (req, res) => {
  try {
    const contenidoID = req.params.id;
    if (isNaN(contenidoID)) {
      return res.status(400).json({ error: "ID de contenido inválido" });
    }
    const contenido = await Contenido.findByPk(contenidoID, {
      attributes: [
        "id",
        "poster",
        "titulo",
        [
          literal(`(
            SELECT c.nombre
            FROM categorias c
            WHERE c.id = Contenido.categoria_id
          )`),
          "categoria",
        ],
        [
          literal(`(
            SELECT GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ')
            FROM generos g
            INNER JOIN Contenido_Generos cg ON g.id = cg.contenido_id
            WHERE cg.contenido_id = Contenido.id
          )`),
          "generos",
        ],
        "resumen",
        "temporadas",
        [
          literal(`(
            SELECT GROUP_CONCAT(a.nombre SEPARATOR ', ')
            FROM actores a
            INNER JOIN Contenido_Actores ca ON a.id = ca.actor_ID
            WHERE ca.contenido_ID = Contenido.id
          )`),
          "reparto",
        ],
        "trailer",
      ],
    });
    contenido
      ? res.status(200).json(contenido)
      : res.status(404).json({ error: "Contenido no encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};

module.exports = { getAllContenido, getIdContenido };
