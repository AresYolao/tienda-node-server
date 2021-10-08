const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT


        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar DB
        this.conectarDB();

        //Middlewares
        this.middlewares()

        //rutas de aplicación
        this.routes();



    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //lectura y parseo del body

        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {


        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuario'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;