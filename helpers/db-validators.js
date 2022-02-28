const { response } = require('express');
const res = require('express/lib/response');
const { Categoria, Producto } = require('../models');
const {Role} = require('../models');
const {Usuario} = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el correo: ${correo} ya esta registrado`);
    }
}


const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`el id: ${id} no existe`);
    }
}

const existeCategoriaPorId = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el id: ${id} no existe`);
    }
}


const existeProductoPorId = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`el id: ${id} no existe`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}