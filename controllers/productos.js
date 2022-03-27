const { response, request } = require('express');
const { fsp : promises } = require('fs');

const db = './db/productos.txt';
const utf = 'utf-8'

const obtenerProductos = async(req = request, res = response) => {
    const productosList  = JSON.parse(fs.readFileSync(db, utf));
    res.json({
        productosList
    });
};

const obtenerProducto = async( req = request, res = response ) => {

}

module.exports = {
    obtenerProductos
}