const { Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../conexion/database");
const AsociacionModel = require("../models/asociacionModel");
const Contenido = require("../models/contenidos");
const Categorias = require("../models/categorias");
const Generos = require("../models/generos");
const Actores = require("../models/actores");
const contenidoActores = require("../models/contenidoActores");
const contenidoGeneros = require("../models/contenidoGeneros");

const getAllContenido = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      attributes: [
        "id",
        "poster",
        "titulo",
        "resumen",
        "temporadas",
        "trailer",
        "duracion",
      ],
      include: [
        {
          model: Categorias,
          as: "categoria",
          attributes: ["nombre"],
        },
        {
          model: Generos,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actores,
          as: "reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
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
        "resumen",
        "temporadas",
        "trailer",
        "duracion",
      ],
      include: [
        {
          model: Categorias,
          as: "categoria",
          attributes: ["nombre"],
        },
        {
          model: Generos,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actores,
          as: "reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
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
const getFindTitulo = async (req, res) => {
  const { titulo } = req.query;
  try {
    const contenidos = await Contenido.findAll({
      where: { titulo: { [Op.like]: `%${titulo}%` } },
      attributes: [
        "id",
        "poster",
        "titulo",
        "resumen",
        "temporadas",
        "trailer",
        "duracion",
      ],
      include: [
        {
          model: Categorias,
          as: "categoria",
          attributes: ["nombre"],
        },
        {
          model: Generos,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actores,
          as: "reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
    });

    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "No hay contenido con ese titulo" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};
const getFindCategoria = async (req, res) => {
  const { categoria } = req.query;
  try {
    const contenidos = await Contenido.findAll({
      attributes: [
        "id",
        "poster",
        "titulo",
        "resumen",
        "temporadas",
        "trailer",
        "duracion",
      ],
      include: [
        {
          model: Categorias,
          as: "categoria",
          attributes: ["nombre"],
          where: {
            nombre: {
              [Op.like]: `%${categoria}%`,
            },
          },
        },
        {
          model: Generos,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actores,
          as: "reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
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
const getFindGenero = async (req, res) => {
  const { genero } = req.query;
  try {
    const contenidos = await Contenido.findAll({
      attributes: [
        "id",
        "poster",
        "titulo",
        "resumen",
        "temporadas",
        "trailer",
        "duracion",
      ],
      include: [
        {
          model: Categorias,
          as: "categoria",
          attributes: ["nombre"],
        },
        {
          model: Generos,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
          where: {
            nombre: {
              [Op.like]: `%${genero}%`,
            },
          },
        },
        {
          model: Actores,
          as: "reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
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

const postCrearContenido = async (req, res) => {
  const {
    poster,
    titulo,
    resumen,
    temporadas,
    trailer,
    categoria,
    duracion,
    generos,
    reparto,
  } = req.body;

  if (!titulo || !categoria || !generos || !reparto) {
    return res
      .status(400)
      .json({ message: "Todos los campos obligatorios deben estar completos" });
  }

  try {
    const [categoriaBuscada] = await Categorias.findOrCreate({
      where: { nombre: categoria },
    });

    const newContenido = await Contenido.create({
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id: categoriaBuscada.id,
      duracion,
    });

    for (nombreActor of reparto) {
      const [actor] = await Actores.findOrCreate({
        where: { nombre: nombreActor },
      });
      await contenidoActores.create({
        contenido_ID: newContenido.id,
        actor_ID: actor.id,
      });
    }

    for (nombreGenero of generos) {
      const [genero] = await Generos.findOrCreate({
        where: { nombre: nombreGenero },
      });
      await contenidoGeneros.create({
        contenido_id: newContenido.id,
        genero_id: genero.id,
      });
    }

    res.status(200).json(newContenido);
  } catch (error) {
    console.error("Error creando contenido:", error);
    res.status(500).json({ message: "Error creando contenido", error });
  }
};

module.exports = {
  getAllContenido,
  getIdContenido,
  getFindTitulo,
  getFindCategoria,
  getFindGenero,
  postCrearContenido,
};
