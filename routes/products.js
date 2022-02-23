const { Router } = require('express');

// Initializing the Router
const router = Router();

// Controller Methods
const { productsGet, productsPost, productsGetById } = require('../controllers/products');

// Routes
router.get( '/', productsGet ); 
router.get('/:id', productsGetById ); 
router.post( '/', productsPost );

module.exports = router;