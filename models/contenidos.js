// Model for Contenido
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

const Contenido = sequelize.define(
"Contenido",
{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  poster: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  resumen: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  temporadas: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  trailer: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Categorias",
      key: "id",
    },
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},
{
  tableName: "Contenido",
  timestamps: false,
}
);


module.exports = Contenido;
