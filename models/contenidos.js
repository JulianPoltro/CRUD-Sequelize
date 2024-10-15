// Model for Contenido
const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const Categorias = require("./categorias");
const Actores = require("./actores");
const Generos = require("./generos");

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
        model: Categorias,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "Contenido",
    timestamps: false,
  }
);


Contenido.belongsToMany(Actores, {
  through: 'Contenido_Actores',
  foreignKey: 'contenido_ID',
});

Contenido.belongsToMany(Generos, {
  through: Contenido_Generos,
  foreignKey: 'contenido_id',
});

Contenido.belongsTo(Categorias, {
  foreignKey: 'categoria_id',
});


module.exports={ Contenido };
