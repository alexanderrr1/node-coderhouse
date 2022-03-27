const { Router } = require('express');

const router = Router();

const { crearCarrito, eliminarCarrito, agregarProductoAlCarrito, obtenerProductosDeCarrito, eliminarProductoDeCarrito } = require('../controllers/carrito.js');

// Crea un nuevo Carrito
router.post( '/', crearCarrito ); 

// Borra un Carrito por ID
router.delete('/:id',eliminarCarrito );

// Listar Productos en un carrito (id Carrito )
router.get('/:id/productos', obtenerProductosDeCarrito);

// Incorporar Productos a un Carrito ( id Producto && id Carrito )
router.post('/:id_carrito/productos/:id_producto', agregarProductoAlCarrito);

// Borrar un producto de un carrito ( id Producto && id Carrito)
router.delete('/:id_carrito/productos/:id_producto', eliminarProductoDeCarrito);

module.exports = router;