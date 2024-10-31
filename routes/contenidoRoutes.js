const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

// Routes for CRUD
router.get("/", contenidoController.getAllContenido);
router.get("/:id", contenidoController.getIdContenido);
router.get("/filter/titulo", contenidoController.getFindTitulo);
router.get("/filter/categoria", contenidoController.getFindCategoria);
router.get("/filter/genero", contenidoController.getFindGenero);
router.post("/", contenidoController.postCrearContenido);
router.put("/:id", contenidoController.putActualizarContenido);
router.delete("/:id", contenidoController.deleteContenido);

module.exports = router;
