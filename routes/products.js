const { Router } = require('express');

const router = Router();

const { productosGet, productosGetJSON } = require('../controllers/productos');

router.get( '/', productosGet );
router.get( '/json', productosGetJSON );

module.exports = router;