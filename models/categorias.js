// Model for Categoria
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");

const Categorias = sequelize.define(
  "Categorias",
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
    tableName: "Categorias",
    timestamps: false,
  }
);

Categorias.hasMany(Contenido, {
  foreignKey: "categoria_id",
});

module.exports = { Categorias };
