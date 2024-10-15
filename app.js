const express = require('express');
const { Contenido } = require("./models/contenidos");
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const db = require('./conexion/database');


// Middlewares
app.use(express.json());
//app.use('/contenido', contenidoRoutes);

app.use(async (req, res, next) => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexión establecida con exito ! =)");
    await Contenido.sync();
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error en el servidor: `, description: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de TraileFlix!");
});

app.get("/contenido", async (req, res) => {
  try {
    const Contenidos = await Contenido.findAll();
    Contenidos.length > 0
      ? res.status(200).json(Contenidos)
      : res.status(404).json({ error: "No hay trailers para mostrar" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error en el servidor: `, description: error.message });
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    