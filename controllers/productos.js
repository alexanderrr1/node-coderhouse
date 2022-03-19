const { response, request } = require('express');
const fs = require('fs');

const db = './db/productos.txt';
const utf = 'utf-8'

const productosGet = async(req = request, res = response) => {
    const productosList  = JSON.parse(fs.readFileSync(db, utf));
    res.render('productoList', {
        productosList
    });
}

const productosGetJSON = async(req = request, res = response) => {
    const productosList  = JSON.parse(fs.readFileSync(db, utf));
    res.json({
        productosList
    });
}

module.exports = {
    productosGet,
    productosGetJSON
}