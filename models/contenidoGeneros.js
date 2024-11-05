const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");
const Genero = require("./generos");

const Contenido_Generos = sequelize.define(
  "contenido_generos",
  {
    contenido_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: "id",
      },
      primaryKey: true,
    },
    genero_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Genero,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "contenido_generos",
    timestamps: false,
  }
);

module.exports = Contenido_Generos;
