const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { SQLiteConfig } = require('../configs/SQLite');
const knex = require('knex')(SQLiteConfig);
const Producto = require('../models/Producto');

const isAdmin = process.env.ADMIN;

const obtenerProductos = async(req = request, res = response) => {
    try{
        const productosList = await knex.select().from("producto");
        return res.json({
            productosList
        });
    } catch (e) {
        console.log(e);
    }
};

const obtenerProducto = async( req = request, res = response ) => {
    const { id } = req.params;
    try {
        const producto = await knex.from('producto').select().where('id', '=', id);
        if(producto.length == 0){
            return res.status(404).json({
                msg: `No existe producto con id ${id}.`
            })
        }
        return res.status(200).json({
            producto
        });
    } catch (e) {
        console.log(e);
    }
}

const agregarProducto = async( req = request, res = response ) => {
    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
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
    try {
        await knex.insert(producto).from("producto");
        // Para convertir los milis en fechas: new Date(producto.timestamp).toLocaleString());
        return res.json({
            producto
        });
    } catch (e) {
        console.log(e);
    }
}

const modificarProducto = async( req = request, res = response ) => {
    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto(
        id,
        Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    );
    try {
        const response = await knex.from('producto').where('id', id).update(producto);
        if(response == 0){
            return res.status(404).json({
                msg: `No existe producto con id ${id}`
            })
        }
        return res.json({
            producto
        });
    } catch (e) {
        console.log(e);
    }
}

const eliminarProducto = async( req = request, res = response ) => {
    if(!isAdmin){
        return res.status(401).json({
            msg: 'No está autorizado para realizar esta operación.'
        })
    }
    const { id } = req.params;
    try {
        const response = await knex.from('producto').where('id', '=', id).del();
        if(response == 0){
            return res.status(404).json({
                msg: `No existe producto con id ${id}`
            })
        }
        res.status(200).json({
            msg: "Producto eliminado con éxito!"
        })
    } catch (e) {
        console.log(e);
    }
} 

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}