const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
]

const buscarUsuarios = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );
    // Busqueda por MongoId
    if(esMongoID) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }
    // Busqueda por cambpos nombre o correo
    const regex = new RegExp( termino, 'i'); // Regex insensible al SensitiveCase
    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: [usuarios]
    });
};

const buscarCategorias = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );
    // Busqueda por MongoId
    if(esMongoID) {
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }
    // Busqueda por cambpos nombre o correo
    const regex = new RegExp( termino, 'i'); // Regex insensible al SensitiveCase
    const categorias = await Categoria.find({ nombre: regex, estado: true });
    res.json({
        results: categorias
    });
};

const buscarProductos = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );
    // Busqueda por MongoId
    if(esMongoID) {
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }
    // Busqueda por cambpos nombre o correo
    const regex = new RegExp( termino, 'i'); // Regex insensible al SensitiveCase
    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');
    res.json({
        results: productos
    });
};

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes( coleccion) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res);
        break;

        case 'categorias':
            buscarCategorias(termino, res);
        break;

        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: "Se le olvido hacer esta búsqueda"
            });
    }


}

module.exports = {

    buscar

}