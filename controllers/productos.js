const { response, request } = require('express');
const fs = require('fs');

const db = './db/productos.txt';
const utf = 'utf-8'

const productosGet = async(req = request, res = response) => {

    const productos  = JSON.parse(fs.readFileSync(db, utf));

    res.json({
        productos
    });

}

const productosGetById = async(req = request, res = response) => {

    const productos  = JSON.parse(fs.readFileSync(db, utf));

    let productoEncontrado = productos.find(producto => producto.id === req.params.id );

    if( !productoEncontrado ){
        
        return res.status(400).json({
            msg : 'No existe producto con ese ID'
        });

    }

    res.json({
        producto : productoEncontrado
    });

}

const productosPost = async(req = request, res = response) => {

    const productos  = JSON.parse(fs.readFileSync(db, utf));

    const productoNuevo = {
        title: 'ProductoNuevo',
        price: '444.44',
        thumbnail: 'https://thumbnailnuevo.com',
        id: '$2a$12$wasdsadadadasdasddasdasdasdadaWY/fwanuevovCZ9KJ6'
    }

    productos.push(productoNuevo);

    fs.writeFileSync(db, JSON.stringify(productos) ,utf);

    res.json({
        productos
    });

}

module.exports = {
    productosGet,
    productosPost,
    productosGetById
}