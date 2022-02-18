const {Router} = require('express');
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch} = require('../controllers/usuariosController');
const router = Router();

//aqui no se ejecuta la funcion se hace referencia
router.get('/', usuariosGet )

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;