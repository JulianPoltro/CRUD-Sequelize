// Model for Contenido_Actor
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");
const Actores = require("./actores");

const Contenido_Actores = sequelize.define(
  "contenido_actores",
  {
    contenido_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: "id",
      },
      primaryKey: true,
    },
    actor_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: Actores,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "contenido_actores",
    timestamps: false,
  }
);

module.exports = Contenido_Actores;
