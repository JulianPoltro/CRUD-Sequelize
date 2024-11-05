// Model for Genero
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

const Generos = sequelize.define(
  "generos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "generos",
    timestamps: false,
  }
);

module.exports = Generos;
