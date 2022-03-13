const { Router } = require('express');

const router = Router();

const { mainGet, mainPost } = require('../controllers/main.js');

router.get( '/', mainGet ); // Trae todos los productos
router.post( '/', mainPost ); // Guarda un producto (Predefinido en el método)

module.exports = router;