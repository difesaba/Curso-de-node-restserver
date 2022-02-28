const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategroia, obtenerCategorias, obtenerCategoria, actualizarCategoria,borrarCategoria } = require('../controllers/categoriasController');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias
router.get('/', obtenerCategorias);

//Obtener un categoria por id
router.get('/:id', [
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria);

//Crear categoria - privado
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategroia)

//Actualizar registro por id -privado
router.put('/:id',[
  validarJWT,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
],actualizarCategoria);

//borrar una categoria admin
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
],borrarCategoria);


module.exports = router;