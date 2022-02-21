const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    //const { q, nombre = 'No name', apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /*Promise.all ejecuta promesas de manera simultanea y reduce el timepo  cuando una promesa no depende de otra y las puede ejeuctar de manera simultanea*/
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({ total, usuarios })
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //encriptar constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar db
    await usuario.save(usuario);
    res.json({ usuario })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, ...resto } = req.body;
    //TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({ usuario })
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    const usuarioAutenticado = req.usuario;

    res.json({ usuario, usuarioAutenticado })
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