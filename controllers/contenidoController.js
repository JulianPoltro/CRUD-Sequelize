const { Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../conexion/database");
const {
  AsociacionModel,
  contenidoAttributes,
  contenidoInclude,
} = require("../models/asociacionModel");
const Contenido = require("../models/contenidos");
const Categorias = require("../models/categorias");
const Generos = require("../models/generos");
const Actores = require("../models/actores");
const contenidoActores = require("../models/contenidoActores");
const contenidoGeneros = require("../models/contenidoGeneros");

const getAllContenido = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      attributes: contenidoAttributes,
      include: contenidoInclude,
    });

    contenidos
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
      attributes: contenidoAttributes,
      include: contenidoInclude,
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
      attributes: contenidoAttributes,
      include: contenidoInclude,
    });

    contenidos
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "No existen contenidos con ese titulo" });
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
      attributes: contenidoAttributes,
      include: [
        ...contenidoInclude,
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
      ],
    });

    contenidos
      ? res.status(200).json(contenidos)
      : res
          .status(404)
          .json({ error: "No existen contenidos con esa categoria" });
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
      attributes: contenidoAttributes,
      include: [
        ...contenidoInclude,
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
      ],
    });

    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "No hay contenidos con ese genero" });
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
    return res.status(400).json({
      message:
        "Todos los campos obligatorios deben estar completos - Titulo* Categoria* Genero* Reparto*",
    });
  }

  try {
    const [buscarCategoria] = await Categorias.findOrCreate({
      where: { nombre: categoria },
    });

    const nuevoContenido = await Contenido.create({
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id: buscarCategoria.id,
      duracion,
    });

    for (nombreActor of reparto) {
      const [actor] = await Actores.findOrCreate({
        where: { nombre: nombreActor },
      });
      await contenidoActores.create({
        contenido_ID: nuevoContenido.id,
        actor_ID: actor.id,
      });
    }

    for (nombreGenero of generos) {
      const [genero] = await Generos.findOrCreate({
        where: { nombre: nombreGenero },
      });
      await contenidoGeneros.create({
        contenido_id: nuevoContenido.id,
        genero_id: genero.id,
      });
    }

    const contenidoCompleto = await Contenido.findByPk(nuevoContenido.id, {
      attributes: contenidoAttributes,
      include: contenidoInclude,
    });

    res
      .status(201)
      .json({ message: "Contenido creado con exito!", contenidoCompleto });
  } catch (error) {
    console.error("Error creando contenido:", error);
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};
const putActualizarContenido = async (req, res) => {
  const { id } = req.params;
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

  try {
    const [buscarCategoria] = await Categorias.findOrCreate({
      where: { nombre: categoria },
    });

    let contenido = await Contenido.findByPk(id);
    if (contenido) {
      await Contenido.update(
        {
          poster,
          titulo,
          resumen,
          temporadas,
          trailer,
          categoria_id: buscarCategoria.id,
          duracion,
        },
        { where: { id } }
      );

      await contenidoActores.destroy({ where: { contenido_ID: id } });
      await contenidoGeneros.destroy({ where: { contenido_id: id } });
    } else {
      contenido = await Contenido.create({
        id,
        poster,
        titulo,
        resumen,
        temporadas,
        trailer,
        categoria_id: buscarCategoria.id,
        duracion,
      });
    }

    for (const nombreActor of reparto) {
      const [actor] = await Actores.findOrCreate({
        where: { nombre: nombreActor },
      });
      await contenidoActores.create({
        contenido_ID: id,
        actor_ID: actor.id,
      });
    }

    for (const nombreGenero of generos) {
      const [genero] = await Generos.findOrCreate({
        where: { nombre: nombreGenero },
      });
      await contenidoGeneros.create({
        contenido_id: id,
        genero_id: genero.id,
      });
    }

    const contenidoActualizadoCompleto = await Contenido.findByPk(id, {
      attributes: contenidoAttributes,
      include: contenidoInclude,
    });

    res.status(200).json({
      message: "Contenido actualizado con éxito!",
      contenido: contenidoActualizadoCompleto,
    });
  } catch (error) {
    console.error("Error al actualizar el contenido", error);
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};
const deleteContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const existeContenido = await Contenido.findByPk(id);
    if (!existeContenido) {
      return res
        .status(404)
        .json({ message: "Contenido no encontrado o ya eliminado" });
    }

    await contenidoActores.destroy({ where: { contenido_ID: id } });
    await contenidoGeneros.destroy({ where: { contenido_id: id } });
    await Contenido.destroy({ where: { id: id } });

    res.status(200).json({ message: "Contenido eliminado con exito!" });
  } catch (error) {
    console.error("Error al eliminar el contenido", error);
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
};

module.exports = {
  getAllContenido,
  getIdContenido,
  getFindTitulo,
  getFindCategoria,
  getFindGenero,
  postCrearContenido,
  putActualizarContenido,
  deleteContenido,
};
