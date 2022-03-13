const { response, request } = require('express');
const fs = require('fs');

const db = './db/productos.txt';
const utf = 'utf-8'

const mainGet = async(req = request, res = response) => {
    res.render('productoForm');
}

const mainPost = async(req = request, res = response) => {
    const { title, price, thumbnail } = req.body;
    const productos = JSON.parse(fs.readFileSync(db, utf));
    const productoNuevo = {
        id : parseInt(productos[productos.length - 1].id) + 1,
        title,
        price : parseFloat(price),
        thumbnail
    }
    productos.push(productoNuevo);
    fs.writeFileSync(db, JSON.stringify(productos) ,utf);
    res.render('productoForm');
}

module.exports = {
    mainGet,
    mainPost,
}