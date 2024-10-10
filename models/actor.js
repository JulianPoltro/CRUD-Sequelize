const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    fecha_Nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Actores",
    timestamps: false,
  }
);

module.exports = Actores;
