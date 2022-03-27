const { response, request } = require('express');
const { promises : fsp } = require('fs');
const { v4: uuidv4 } = require('uuid');
const Producto = require('../models/Producto');

const productosDB = './db/productos.txt';
const utf = 'utf-8'
const isAdmin = process.env.ADMIN;

const obtenerProductos = async(req = request, res = response) => {
    const productosList = await leerProductosDB();
    return res.json({
        productosList
    });
};

const obtenerProducto = async( req = request, res = response ) => {
    const { id } = req.params;
    const productosList = await leerProductosDB();
    const productoParaEncontrar = productosList.filter(product => product.id == id)[0];
    if(productoParaEncontrar == undefined){
        return res.status(404).json({
            msg: `No existe producto con id ${id}.`
        })
    }
    const producto = productosList.filter( producto => producto.id == id );
    return res.status(200).json({
        producto
    });
}

const agregarProducto = async( req = request, res = response ) => {

    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }

    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const productosList = await leerProductosDB();
    const producto = new Producto(
        uuidv4(),
        Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    )
    // Para convertir los milis en fechas: new Date(producto.timestamp).toLocaleString());
    productosList.push(producto);
    await escribirProductosDB(productosList);
    return res.json({
        producto
    });
}

const modificarProducto = async( req = request, res = response ) => {
    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const productList = await leerProductosDB();
    const productoParaModificar = productList.filter(product => product.id == id)[0];
    if(productoParaModificar == undefined){
        return res.status(404).json({
            msg: `No existe producto con id ${id}.`
        })
    }
    const producto = new Producto(
        productoParaModificar.id,
        Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    );
    const productListFiltrada = productList.filter(product => product.id != id);
    productListFiltrada.push(producto);
    await escribirProductosDB(productListFiltrada);
    return res.json({
        producto
    });
}

const eliminarProducto = async( req = request, res = response ) => {
    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }
    const { id } = req.params;
    const productList = await leerProductosDB();
    const productoParaEliminar = productList.filter(product => product.id == id)[0];
    if(productoParaEliminar == undefined){
        return res.status(404).json({
            msg: `No existe producto con id ${id}.`
        })
    }
    const productListFiltrada = productList.filter(product => product.id != id);
    await escribirProductosDB(productListFiltrada);
    return res.json({
        msg: 'Producto eliminado con éxito.'
    });


} 

const leerProductosDB = async() => {

    let lectura = await fsp.readFile(productosDB, utf);
    if( lectura == "" ){
        lectura = "[]";
    }
    return JSON.parse(lectura);

}

const escribirProductosDB = async(data) => {
    await fsp.writeFile(productosDB, JSON.stringify(data), utf);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}