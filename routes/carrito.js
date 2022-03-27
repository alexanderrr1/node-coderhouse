const { Router } = require('express');

const router = Router();

const { mainGet, mainPost } = require('../controllers/carrito.js');

const isAdmin = process.env.ADMIN;

router.get( '/', mainGet ); // Trae todos los productos
router.post( '/', mainPost ); // Guarda un producto (Predefinido en el método)

module.exports = router;