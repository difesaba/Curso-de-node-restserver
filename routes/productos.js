const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto,borrarProducto } = require('../controllers/productosController');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos los productos
router.get('/', obtenerProductos);

//Obtener un producto por id
router.get('/:id', [
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], obtenerProducto);

//Crear producto - privado
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de mongo').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], crearProducto)

//Actualizar registro por id -privado
router.put('/:id',[
  validarJWT,
  check('categoria', 'No es un id de mongo').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
],actualizarProducto);

//borrar un producto admin
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
],borrarProducto);


module.exports = router;