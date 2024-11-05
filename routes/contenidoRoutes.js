const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

/**
 * @swagger
 * /contenidos:
 *   get:
 *     summary: Obtiene todos los contenidos
 *     description: Esta ruta devuelve una lista de todos los contenidos disponibles en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de contenidos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   resumen:
 *                     type: string
 *                   temporadas:
 *                     type: integer
 *                   trailer:
 *                     type: string
 *                   categoria_id:
 *                     type: integer
 *                   duracion:
 *                     type: string
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
 *     summary: Obtiene un contenido por su ID
 *     description: Esta ruta devuelve el contenido correspondiente al ID proporcionado.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 resumen:
 *                   type: string
 *                 temporadas:
 *                   type: integer
 *                 trailer:
 *                   type: string
 *                 categoria_id:
 *                   type: integer
 *                 duracion:
 *                   type: string
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
 *     summary: Filtra los contenidos por título
 *     description: Esta ruta permite buscar contenidos que coincidan con el título proporcionado.
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         description: Título del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido(s) con el título proporcionado encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   categoria_id:
 *                     type: integer
 *                   resumen:
 *                     type: string
 *                   duracion:
 *                     type: string
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
 *     summary: Filtra los contenidos por categoría
 *     description: Esta ruta permite buscar contenidos por categoría.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: true
 *         description: Categoría del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido(s) con la categoría proporcionada encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   categoria_id:
 *                     type: integer
 *                   resumen:
 *                     type: string
 *                   duracion:
 *                     type: string
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
 *     summary: Filtra los contenidos por género
 *     description: Esta ruta permite buscar contenidos que coincidan con el género proporcionado.
 *     parameters:
 *       - in: query
 *         name: genero
 *         required: true
 *         description: Género del contenido a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido(s) con el género proporcionado encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   categoria_id:
 *                     type: integer
 *                   resumen:
 *                     type: string
 *                   duracion:
 *                     type: string
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
 *     description: Esta ruta permite crear un nuevo contenido en la base de datos.
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
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               trailer:
 *                 type: string
 *               categoria:
 *                 type: string
 *               duracion:
 *                 type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 resumen:
 *                   type: string
 *                 temporada:
 *                   type: integer
 *                 trailer:
 *                   type: string
 *                 categoria_id:
 *                   type: integer
 *                 duracion:
 *                   type: string
 *       400:
 *         description: Campos obligatorios no proporcionados
 *       500:
 *         description: Error en el servidor
 */
router.post("/", contenidoController.postCrearContenido);

/**
 * @swagger
 * /contenidos/{id}:
 *   put:
 *     summary: Actualiza un contenido existente
 *     description: Actualiza los detalles de un contenido por su ID.
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
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               trailer:
 *                 type: string
 *               categoria:
 *                 type: string
 *               duracion:
 *                 type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
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
 *     description: Elimina el contenido con el ID proporcionado de la base de datos.
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
