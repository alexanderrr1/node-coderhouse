class Producto {

    constructor(id, timestamp, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

}

module.exports = Producto;