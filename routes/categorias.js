const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* Obtener todas las categorías - público */
router.get('/', obtenerCategorias );

/* Obtener una categorías por id - público */
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria );

/* Crear categorías por id - privado - cualquier persona con un token válido */
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
], crearCategoria );

/* Actualizar un registro por id - privado - cualquier persona con un token válido */
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria );

/* Borrar una categoría - Admin - Activo a inactivo */
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria );

module.exports = router;