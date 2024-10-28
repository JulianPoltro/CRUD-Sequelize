// Model for Genero
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

const Generos = sequelize.define(
  "Generos",
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
    tableName: "Generos",
    timestamps: false,
  }
);

module.exports = Generos;
