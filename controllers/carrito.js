const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { promises : fsp } = require('fs');
const Carrito = require('../models/Carrito');

const carritosDB = './db/carritos.txt';
const productosDB = './db/productos.txt';
const utf = 'utf-8'

const crearCarrito = async(req = request, res = response) => {

    const carritosList = await leerCarritosDB();
    const carrito = new Carrito(
        uuidv4(),
        Date.now(),
        [],
    );
    carritosList.push(carrito);
    escribirCarritosDB(carritosList);
    res.status(201).json({
        msg: `Se ha creado el carrito ${carrito.id} con éxito`
    });
}

const eliminarCarrito = async(req = request, res = response) => {
    const { id } = req.params;
    const carritosList = await leerCarritosDB();
    const carritoParaEliminar = carritosList.filter(carrito => carrito.id == id)[0];
    if(carritoParaEliminar == undefined){
        return res.status(404).json({
            msg: `No existe carrito con id ${id}.`
        })
    }
    const carritosListFiltrada = carritosList.filter(carrito => carrito.id != id);
    await escribirCarritosDB(carritosListFiltrada);
    return res.json({
        msg: 'Carrito eliminado con éxito.'
    });
}

const obtenerProductosDeCarrito = async(req = request, res = response) => {
    
    const { id } = req.params;

    //Traer el carrito a mostrar los productos
    const carritosList = await leerCarritosDB();
    const carritoMostrarProductos = carritosList.filter(carrito => carrito.id == id)[0];
    if(carritoMostrarProductos == undefined){
        return res.status(404).json({
            msg: `No existe carrito con id ${id}.`
        })
    }

    const productos = carritoMostrarProductos.producto;

    res.json({
        productos
    })
}

const agregarProductoAlCarrito = async(req = request, res = response) => {

    const { id_carrito, id_producto } = req.params;
    
    //Traer el carrito a modificar
    const carritosList = await leerCarritosDB();
    const carritoParaModificar = carritosList.filter(carrito => carrito.id == id_carrito)[0];
    if(carritoParaModificar == undefined){
        return res.status(404).json({
            msg: `No existe carrito con id ${id_carrito}.`
        })
    }

    // Traer el producto a guardar
    const productosList = await leerProductosDB();
    const productoParaAgregarAlCarrito = productosList.filter(producto => producto.id == id_producto)[0];
    if(productoParaAgregarAlCarrito == undefined){
        return res.status(404).json({
            msg: `No existe producto con id ${id_producto}.`
        });
    }

    // Validar que el producto no exista en el carrito
    for(productoEnCarrito of carritoParaModificar.producto){
        if(productoEnCarrito.id == productoParaAgregarAlCarrito.id){
            return res.status(404).json({
                msg: `El producto seleccionado ya se encuentra en el carrito.`
            });
        };
    }

    // Agrego el Producto
    carritoParaModificar.producto.push(productoParaAgregarAlCarrito);

    // Guardo el carrito en la DB
    const carritosListActualizada = carritosList.filter(carrito => carrito.id != id_carrito);
    carritosListActualizada.push(carritoParaModificar);
    await escribirCarritosDB(carritosListActualizada);

    res.status(200).json({
        carritoParaModificar
    })
}

const eliminarProductoDeCarrito = async(req = request, res = response) => {

    const { id_carrito, id_producto } = req.params;

    // Traer el carrito elegido
    const carritosList = await leerCarritosDB();
    const carritoParaEliminarProducto = carritosList.filter(carrito => carrito.id == id_carrito)[0];
    if(carritoParaEliminarProducto == undefined){
        return res.status(404).json({
            msg: `No existe carrito con id ${id_carrito}.`
        })
    }

    // Separo los productos.
    let productosDelCarrito = carritoParaEliminarProducto.producto;

    // Validacion para verificar el que producto exista dentro del carrito
    if(!existeProductoEnElCarrito(productosDelCarrito, id_producto)){
        return res.status(404).json({
            msg: `No existe el producto con id ${id_producto} en el carrito ${id_carrito}`
        })
    };

    // Asigno los nuevos productos (No eliminados) al carrito.
    productosDelCarrito = productosDelCarrito.filter(producto => producto.id != id_producto);
    carritoParaEliminarProducto.producto = productosDelCarrito;

    // Guardo el carrito en la DB
    const carritosListActualizada = carritosList.filter(carrito => carrito.id != id_carrito);
    carritosListActualizada.push(carritoParaEliminarProducto);
    await escribirCarritosDB(carritosListActualizada);

    return res.status(200).json({
        carritoParaEliminarProducto
    })

}

const leerCarritosDB = async() => {

    let lectura = await fsp.readFile(carritosDB, utf);
    if( lectura == "" ){
        lectura = "[]";
    }
    return JSON.parse(lectura);

}

const escribirCarritosDB = async(data) => {
    await fsp.writeFile(carritosDB, JSON.stringify(data), utf);
}

const leerProductosDB = async() => {

    let lectura = await fsp.readFile(productosDB, utf);
    if( lectura == "" ){
        lectura = "[]";
    }
    return JSON.parse(lectura);

}

const existeProductoEnElCarrito = (productosDelCarrito, productoId) => {
    const finded = productosDelCarrito.find(producto => producto.id == productoId);
    return finded == undefined ? false : true;
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    agregarProductoAlCarrito,
    obtenerProductosDeCarrito,
    eliminarProductoDeCarrito
}