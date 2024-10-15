// Model for Genero
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");

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

Generos.belongsToMany(Contenido, {
  through: ContenidoGeneros,
  foreignKey: 'genero_id',
});

module.exports={ Generos };
