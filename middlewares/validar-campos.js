const { validationResult } = require('express-validator');


//nex es metodo para seguri cada middleware cuando aymas de uno
const validarCampos = ( req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}


module.exports = {
    validarCampos
}