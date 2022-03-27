const { Router } = require('express');

const router = Router();

const { obtenerProductos, obtenerProducto, agregarProducto, modificarProducto, eliminarProducto } = require('../controllers/productos');

// Permite listar todos los productos
router.get( '/', obtenerProductos );

// Permite listar un producto por ID
router.get( '/:id', obtenerProducto );

// Permite agregar un producto (Solo administradores)
router.post('/', agregarProducto );

// Actualiza un producto por su id (Solo administradores)
router.put('/:id', modificarProducto );

// Permite borrar un producto por su id (Solo Administradores)
router.delete('/:id', eliminarProducto );

module.exports = router;