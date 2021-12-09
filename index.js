import Contenedor from './classes/Contenedor.js';

// Genero una instancia de la clase contenedor
let contenedor = new Contenedor('data');

// Genero un elemento de testing
const elementoTest = {
    "title": "Mouse",
    "price": 123.45
}

// Metodo Save() -> Guardo 5 veces el elemento de test
for(let i = 0; i < 5 ; i++){
    console.log(contenedor.save(elementoTest));
}

// Metodo getById() -> Obtengo el ID 2
console.log(contenedor.getById(2));

// Metodo getAll()
console.log(contenedor.getAll());

// Metodo deleteById()
contenedor.deleteById(2);

// Metodo deleteAll()
contenedor.deleteAll();


