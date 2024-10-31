// models/index.js
const Contenido = require("./contenidos");
// const Categoria = require("./categoria");
const Actores = require("./actores");
const Generos = require("./generos");
const Categoria = require("./categorias");
const Contenido_Actores = require("./contenidoActores");
const Contenido_Generos = require("./contenidoGeneros");

// Definir las asociaciones

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

module.exports = {
  Contenido,
  Actores,
  Generos,
  Categoria,
};
