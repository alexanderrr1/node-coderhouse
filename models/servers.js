const express = require('express');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productosRoutePath = '/productos';

        // Rutas de mi aplicación
        this.routes();
    }

    routes() {

        this.app.use( this.productosRoutePath, require('../routes/productos') );

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;