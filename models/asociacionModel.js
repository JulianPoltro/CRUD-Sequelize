const Contenido = require("./contenidos");
const Actores = require("./actores");
const Generos = require("./generos");
const Categoria = require("./categorias");
const Contenido_Actores = require("./contenidoActores");
const Contenido_Generos = require("./contenidoGeneros");


Contenido.belongsToMany(Actores, {
  through: Contenido_Actores,
  foreignKey: "contenido_ID",
  otherKey: "actor_ID",
  as: "reparto",
});

Contenido.belongsToMany(Generos, {
  through: Contenido_Generos,
  foreignKey: "contenido_ID",
  otherKey: "genero_id",
  as: "generos",
});

Contenido.belongsTo(Categoria, {
  foreignKey: "categoria_id",
  as: "categoria",
});

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
    model: Categoria,
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
  Contenido,
  Actores,
  Generos,
  Categoria,
  contenidoAttributes,
  contenidoInclude,
};
