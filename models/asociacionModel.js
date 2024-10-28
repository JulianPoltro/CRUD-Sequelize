// models/index.js
const Contenido = require("./contenidos");
// const Categoria = require("./categoria");
const Actores = require("./actores");
const Contenido_Actores = require("./contenidoActores");

// Definir las asociaciones

Contenido.belongsToMany(Actores, {
  through: Contenido_Actores,
  foreignKey: "contenido_ID",
  otherKey: "actor_ID",
  as: "actores",
});





module.exports = {
  Contenido,
  Actores
  //   Categoria,
};
