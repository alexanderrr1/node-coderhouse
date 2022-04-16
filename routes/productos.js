const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* Obtener todas las categorías - público */
router.get('/', obtenerProductos );

/* Obtener una categorías por id - público */
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto );

/* Crear categorías por id - privado - cualquier persona con un token válido */
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos, 
], crearProducto );

/* Actualizar un registro por id - privado - cualquier persona con un token válido */
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

/* Borrar una categoría - Admin - Activo a inactivo */
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );

module.exports = router;