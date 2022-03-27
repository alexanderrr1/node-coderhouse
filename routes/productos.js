const { Router } = require('express');

const router = Router();

const { obtenerProductos } = require('../controllers/productos');

const isAdmin = process.env.ADMIN;

// Permite listar todos los productos
router.get( '/', obtenerProductos );

// Permite listar un producto por ID

// Permite agregar un producto (Solo administradores)

// Actualiza un producto por su id (Solo administradores)

// Permite borrar un producto por su id (Solo Administradores)

module.exports = router;