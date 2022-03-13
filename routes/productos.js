const { Router } = require('express');

const router = Router();

const { productosGet } = require('../controllers/productos');

router.get( '/', productosGet );

module.exports = router;