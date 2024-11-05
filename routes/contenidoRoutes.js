const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

/**
 * @swagger
 * /contenidos:
 *   get:
 *     summary: Muestra todo el contenido
 *     description: Devuelve una lista de todos los contenidos disponibles en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de contenidos obtenida exitosamente
 *       404:
 *         description: No hay contenidos para mostrar
 *       500:
 *         description: Error en el servidor
 */
router.get("/", contenidoController.getAllContenido);

/**
 * @swagger
 * /contenidos/{id}:
 *   get:
 *     summary: Muestra el contenido por ID
 *     description: Devuelve el contenido específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido que se quiere obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido obtenido exitosamente
 *       404:
 *         description: Contenido no encontrado
 *       400:
 *         description: ID de contenido inválido
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", contenidoController.getIdContenido);

/**
 * @swagger
 * /contenidos/filter/titulo:
 *   get:
 *     summary: Filtra contenidos por título
 *     description: Busca y devuelve contenidos que coincidan con el título proporcionado.
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         description: Título del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenidos con el título proporcionado encontrados
 *       404:
 *         description: No existen contenidos con ese título
 *       400:
 *         description: Parámetro 'titulo' no proporcionado o inválido
 *       500:
 *         description: Error en el servidor
 */
router.get("/filter/titulo", contenidoController.getFindTitulo);

/**
 * @swagger
 * /contenidos/filter/categoria:
 *   get:
 *     summary: Filtra contenidos por categoría
 *     description: Busca y devuelve contenidos que coincidan con la categoría proporcionada.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: true
 *         description: Categoría del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenidos con la categoría proporcionada encontrados
 *       404:
 *         description: No existen contenidos con esa categoría
 *       400:
 *         description: Parámetro 'categoria' no proporcionado o inválido
 *       500:
 *         description: Error en el servidor
 */
router.get("/filter/categoria", contenidoController.getFindCategoria);

/**
 * @swagger
 * /contenidos/filter/genero:
 *   get:
 *     summary: Filtra contenidos por género
 *     description: Busca y devuelve contenidos que coincidan con el género proporcionado.
 *     parameters:
 *       - in: query
 *         name: genero
 *         required: true
 *         description: Género del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenidos con el género proporcionado encontrados
 *       404:
 *         description: No hay contenidos con ese género
 *       400:
 *         description: Parámetro 'genero' no proporcionado o inválido
 *       500:
 *         description: Error en el servidor
 */
router.get("/filter/genero", contenidoController.getFindGenero);

/**
 * @swagger
 * /contenidos:
 *   post:
 *     summary: Crea un nuevo contenido
 *     description: Permite crear un nuevo contenido en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poster:
 *                 type: string
 *               titulo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: string
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
 *               trailer:
 *                 type: string
 *               duracion:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *       400:
 *         description: Campos obligatorios no proporcionados
 *       500:
 *         description: Error en el servidor
 */
router.post("/", contenidoController.postCrearContenido);

/**
 * @swagger
 /contenidos/{id}:
 *   put:
 *     summary: Actualiza un contenido existente
 *     description: Permite actualizar los detalles de un contenido por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poster:
 *                 type: string
 *               titulo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: string
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
 *               trailer:
 *                 type: string
 *               duracion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", contenidoController.putActualizarContenido);

/**
 * @swagger
 * /contenidos/{id}:
 *   delete:
 *     summary: Elimina un contenido por su ID
 *     description: Permite eliminar un contenido en la base de datos basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado exitosamente
 *       404:
 *         description: Contenido no encontrado o ya eliminado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", contenidoController.deleteContenido);

module.exports = router;
