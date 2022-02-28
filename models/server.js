require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }
        /*
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        this.categoriasPath     = '/api/categorias';
        */
        //Conectar base de datos
        this.conectarDB();
        //Middlewares funcion q se ejecuta cuando se levanta el servidor
        this.middlewares();
        //Rutas aplicacion
        this.routes();
    }
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //lectura y parse body params para post put delete
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }

}

module.exports = Server;