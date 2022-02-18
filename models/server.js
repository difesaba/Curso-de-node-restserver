require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares funcion q se ejecuta cuando se levanta el servidor
        this.middlewares();
        //Rutas aplicacion
        this.routes();
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }

}

module.exports = Server;