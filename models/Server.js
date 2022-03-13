const express = require('express');
const { engine } = require("express-handlebars");

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.productosRoutePath = '/productos';
        this.mainRoutePath = '/';
        this.middlewares();
        this.viewEngine();
        this.routes();
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: false}));
        this.app.use( express.static('public') );
    }

    viewEngine() {
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', './views');
    }

    routes() {
        this.app.use( this.mainRoutePath, require('../routes/main') );
        this.app.use( this.productosRoutePath, require('../routes/productos') );
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;