const { response } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'No name', apikey} = req.query;
    res.json({
        msg: 'Get API- Controlador',
        q: q,
        nombre: nombre,
        apikey: apikey
    })
}

const usuariosPost = (req, res = response) => {
    const {nombre,edad} = req.body;
    res.json({
        msg: 'Post API- Controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        msg: 'Put API- Controlador',
        id: id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API- Controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API- Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}