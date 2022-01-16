const { Router } = require('express');

// Inicializo el Router
const router = Router();

// Métodos del controlador
const { productosGet, productosPost, productosGetById } = require('../controllers/productos');

// Rutas
router.get( '/', productosGet ); // Trae todos los productos
router.get('/:id', productosGetById ); // Trae producto por ID
router.post( '/', productosPost ); // Guarda un producto (Predefinido en el método)

module.exports = router;