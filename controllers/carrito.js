const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { mariaDBConfig } = require('../configs/mariaDB');
const knex = require('knex')(mariaDBConfig);

const Carrito = require('../models/Carrito');

const crearCarrito = async(req = request, res = response) => {
    const carrito = new Carrito(
        uuidv4(),
        Date.now(),
        "[]"
    );
    try{
        await knex.insert(carrito).from('carrito');
    
        res.status(201).json({
            msg: `Se ha creado el carrito ${carrito.id} con éxito`
        });
    } catch (e) {
        console.log(e)
    }
}

const eliminarCarrito = async(req = request, res = response) => {
    const { id } = req.params;
    try {
        const response = await knex.from('carrito').where('id', '=', id).del();
        if( response == 0){
            return res.status(404).json({
                msg: `No existe carrito con id ${id}`
            })   
        }
        res.status(200).json({
            msg: "Carrito eliminado con éxito!"
        })
    } catch (e) {
        console.log(e);
    }
}

const obtenerProductosDeCarrito = async(req = request, res = response) => {
    
    const { id } = req.params;

    // Verificar si existe el carrito
    try {
        const carritoDB = await knex.from('carrito').select().where('id', '=', id);
        if(carritoDB.length == 0){
            return res.status(404).json({
                msg: `No existe carrito con id ${id}.`
            })
        }
    
        // Convertir los productos en objetos y pushearlo al carrito
        const productosCarrito = JSON.parse(carritoDB[0].producto);
    
        res.status(200).json({
            productosCarrito
        })
    } catch (e){
        console.log(e);
    }
}

const agregarProductoAlCarrito = async(req = request, res = response) => {
    try {
        const { id_carrito, id_producto } = req.params;
        
        // Traer el producto a guardar
            const productoDB = await knex.from('producto').select().where('id', '=', id_producto);
            if(productoDB.length == 0){
                return res.status(404).json({
                    msg: `No existe producto con id ${id_producto}.`
                })
            }
    
        // Traer el carrito
            const carritoDB = await knex.from('carrito').select().where('id', '=', id_carrito);
            if(carritoDB.length == 0){
                return res.status(404).json({
                    msg: `No existe carrito con id ${id_carrito}.`
                })
            }
    
        
        // Convertir los productos en objetos
        let productosCarrito = JSON.parse(carritoDB[0].producto);
    
        //Verificar si existe el producto en el carrito
        let existe = false;
        for(let producto of productosCarrito){
            if(producto.id == productoDB[0].id){
                existe = true;
            }
        }
    
        // Agregar al carrito (Si no existe)
        if(!existe){
            productosCarrito.push(productoDB[0]);
        } else {
            return res.status(400).json({
                msg: 'El producto ya se encuentra en el carrito'
            })
        }
    
        //Actualizar Carrito
        await knex.from('carrito').where('id', id_carrito).update('producto', JSON.stringify(productosCarrito));
    
        res.status(200).json({
            productosCarrito
        })

    } catch (e){
        console.log(e);
    }

}

const eliminarProductoDeCarrito = async(req = request, res = response) => {
    const { id_carrito, id_producto } = req.params;
    
    try {
        // Traer el producto a guardar
        const productoDB = await knex.from('producto').select().where('id', '=', id_producto);
        if(productoDB.length == 0){
            return res.status(404).json({
                msg: `No existe producto con id ${id_producto}.`
            })
        }

        // Traer el carrito
        const carritoDB = await knex.from('carrito').select().where('id', '=', id_carrito);
        if(carritoDB.length == 0){
            return res.status(404).json({
                msg: `No existe carrito con id ${id_carrito}.`
            })
        }
    
        // Convertir los productos en objetos
        let productosCarrito = JSON.parse(carritoDB[0].producto);

        //Verificar si existe el producto en el carrito
        let existe = false;
        for(let producto of productosCarrito){
            if(producto.id == productoDB[0].id){
                existe = true;
            }
        }

        // Agregar al carrito (Si no existe)
        if(!existe){
            return res.status(400).json({
                msg: "No existe el producto en el carrito"
            })
        } else {
            const productosFiltrados = productosCarrito.filter( producto => producto.id != productoDB[0].id)
            await knex.from('carrito').where('id', id_carrito).update('producto', JSON.stringify(productosFiltrados));
        }

        res.status(200).json({
            msg: 'Producto eliminado con éxito!'
        })

    } catch(e){
        console.log(e)
    }

}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    agregarProductoAlCarrito,
    obtenerProductosDeCarrito,
    eliminarProductoDeCarrito
}