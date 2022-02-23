const express = require('express');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productsRoutePath = '/products';
        
        this.routes();
    }

    routes() {

        this.app.use(this.productsRoutePath, require('../routes/products'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port:", this.port);
        });
    }

}

module.exports = Server;