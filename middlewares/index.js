const  validarCampos        = require('../middlewares/validar-campos');
const  validarJWT           = require('../middlewares/validar-jwt');
const  validarRoles         = require('../middlewares/validar-roles');
const  validaArchivoSubir   = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validaArchivoSubir,
}