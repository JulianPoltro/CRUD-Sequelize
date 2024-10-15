const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

// Routes for CRUD
router.get('/', contenidoController.getAllContenido);

// router.get('/:id', (req, res) => {
//     // Get content by ID
// });

// router.post('/', (req, res) => {
//     // Add new content
// });

// router.put('/:id', (req, res) => {
//     // Update content by ID
// });

// router.delete('/:id', (req, res) => {
//     // Delete content by ID
// });

module.exports = router;
    