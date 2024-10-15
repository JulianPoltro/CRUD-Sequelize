// Model for Categoria
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");
const Contenido_Actores = require("./contenidoActores");

const Actores = sequelize.define(
  "Actores",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    tableName: "Actores",
    timestamps: false,
  }
);

module.exports =  Actores ;
