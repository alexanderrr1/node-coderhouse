const express = require('express');
const SQLite = require('../db/SQLite');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.productosRoutePath = '/api/productos';
        this.carritoRoutePath = '/api/carrito';
        this.notFoundRoutPath = '/*';
        this.db();
        this.middlewares();
        this.routes();
    }

    async db() {
        await SQLite.initialize();
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: false}));
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.carritoRoutePath, require('../routes/carrito') );
        this.app.use( this.productosRoutePath, require('../routes/productos') );
        this.app.use( this.notFoundRoutPath, require('../routes/notFound') );
    }
    
    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;