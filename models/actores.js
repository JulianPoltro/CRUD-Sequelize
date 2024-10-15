// Model for Categoria
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Contenido = require("./contenidos");

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

Actores.belongsToMany(Contenido, {
  through: 'Contenido_Actores',
  foreignKey: 'actor_ID',
});

module.exports={ Actores };
