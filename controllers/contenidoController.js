const { Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../conexion/database");
const Actor = require("../models/actores");
const Categoria = require("../models/categorias");
const Contenido = require("../models/contenidos");
const Genero = require("../models/generos");
const Contenidos = require("../models/asociacionModel");

const getAllContenido = async (req, res) => {
  try {
    const Contenidos = await Contenido.findAll({
      attributes: {
        include: [
          [
            literal(`(SELECT GROUP_CONCAT(A.nombre SEPARATOR ', ') FROM Actores A
            INNER JOIN Contenido_Actores CA ON A.id = CA.actor_ID
            WHERE CA.contenido_ID = Contenido.id)`),
            "actores",
          ],
        ],
      },
    });

    Contenidos.length > 0
      ? res.status(200).json(Contenidos)
      : res.status(404).json({ error: "No hay trailers para mostrar" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error en el servidor: `, description: error.message });
  }
};

module.exports = { getAllContenido };
