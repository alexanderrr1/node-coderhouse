const { SQLiteConfig } = require('../configs/SQLite');

const initialize = async() => {
    const knex = require('knex')(SQLiteConfig);
    console.log("Conexión a la DB con éxito!");

    // Crear tabla de Productos
    if(!await knex.schema.hasTable('producto')){
        knex.schema.createTable('producto', table => {
            table.string('id');
            table.string('timestamp');
            table.string('nombre');
            table.string('descripcion');
            table.string('codigo');
            table.string('foto');
            table.float('precio');
            table.integer('stock');
        })
        .then(() => { console.log("Tabla creada con éxito") })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy()});
    };


    // Crear tabla de Carrito
    if(!await knex.schema.hasTable('carrito')){
        knex.schema.createTable('carrito', table => {
            table.string('id');
            table.string('timestamp');
            table.json('producto');
        })
        .then(() => { console.log("Tabla creada con éxito") })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy()});
    }
    
} 

module.exports = ({
    initialize
}) 