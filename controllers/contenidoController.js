const Actor = require("../models/actores")
const Categoria = require("../models/categorias")
const ContenidoActor = require("../models/contenidoActores")
const ContenidoGenero = require("../models/contenidoGeneros")
const Contenido = require("../models/contenidos")
const Genero = require("../models/generos")



const getAllContenido = async (req, res) => {
    try {
      const Contenidos = await Contenido.findAll({
        include: [Actor, Genero, Categoria]
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


  module.exports = { getAllContenido }