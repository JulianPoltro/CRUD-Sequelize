const express = require('express');
const contenidoRoutes = require('./routes/contenidoRoutes');
const app = express();
const db = require('./conexion/database');


// Middlewares
app.use(express.json());
//autenticacion base de datos
app.use(async (req, res, next) => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexión establecida con exito ! =)");
    next()
  } catch (error) {
    res
    .status(500)
    .json({ error: `Error en el servidor: `, description: error.message });
  }
});


app.use('/contenidos', contenidoRoutes);

//Pagina principal
 app.get("/", (req, res) => {
   res.send("Bienvenido a la API de TraileFlix!");
 });

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    