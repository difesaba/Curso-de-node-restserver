const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudDinary } = require('../controllers/uploadsController');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,validaArchivoSubir } = require('../middlewares/');
const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    validaArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], /*actualizarImagen*/actualizarImagenCloudDinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImagen);

module.exports = router;