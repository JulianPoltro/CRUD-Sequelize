// Model for Categoria
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

const Categorias = sequelize.define(
  "categorias",
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
    tableName: "categorias",
    timestamps: false,
  }
);

module.exports = Categorias;
