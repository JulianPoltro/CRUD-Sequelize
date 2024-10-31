const Categorias = require("../models/categorias");
const Generos = require("../models/generos");
const Actores = require("../models/actores");

const contenidoAttributes = [
  "id",
  "poster",
  "titulo",
  "resumen",
  "temporadas",
  "trailer",
  "duracion",
];

const contenidoInclude = [
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
];

module.exports = {
  contenidoAttributes,
  contenidoInclude,
};
