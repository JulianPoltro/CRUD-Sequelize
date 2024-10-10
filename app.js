const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const db = require('./conexion/database');

// Middlewares
app.use(express.json());
app.use('/contenido', contenidoRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API del SuperMarket!");
});


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    