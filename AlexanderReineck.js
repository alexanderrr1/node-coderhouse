class Usuario{ // Creo la clase Usuario

    constructor(nombre, apellido, libros, mascotas){ // Defino el constructor de la clase usuario.

        this.nombre = nombre; // Le defino un parametro "nombre".
        this.apellido = apellido; // Le defino un parametro "apellido".
        this.libros = libros; // Le defino un parametro "libros".
        this.mascotas = mascotas; // Le defino un parametro "mascotas".

    }

    getFullName() { // Defino un metodo llamado "getFullName()".
        return `${this.nombre} ${this.apellido}`; // Concateno con template strings el nombre y apellido de X instancia de Usuario.
    }

    addMascota(nombre) { // Defino un metodo llamado "addMascota()".
        this.mascotas.push(nombre); // Le agrego al atributo array "mascotas", el nombre de la mascota ingresada por parámetro.
    }

    countMascotas() { // Defino un metodo llamado "countMascotas()".
        return this.mascotas.length; // Devuelvo la cantidad de mascotas en el array.
    }

    addBook(nombre, autor) { // Defino un metodo llamado "addBook()".
        this.libros.push({nombre, autor}); // Agrego al atributo array "libros", el libro y autor ingresados por parámetro.
    }

    getBookNames() { // Defino un metodo llamado "getBookNames()".
        return this.libros.map(libro => libro.nombre); // Devuelvo el nombre de cada libro dentro del parametro array "libros".
    }

}

let usuario = new Usuario("Alex", "Reineck", [], []); // Creo un usuario nuevo.
usuario.addMascota("Perro"); // Le agrego una mascota "Perro".
usuario.addMascota("Gato"); // Le agrego una mascota "Gato",
usuario.addBook("El señor de las moscas", "William Golding"); // Le agrego un libro...
usuario.addBook("Fundacion", "Isaac Asimov"); // Le agrego otro libro...

console.log("\n**************************************************************************************\n"); // Console para diferenciar los otros consoles.
console.log(usuario); // Muestro el usuario.
console.log("\n**************************************************************************************\n"); // Console para diferenciar los otros consoles.  
console.log("countMascotas ->", usuario.countMascotas()); // Muestro la cantidad de mascotas que tiene el usuario.
console.log("\n**************************************************************************************\n"); // Console para diferenciar los otros consoles. 
console.log("getBookNames ->", usuario.getBookNames()); // Muestro los nombres de los libros que tiene el usuario.
console.log("\n**************************************************************************************\n"); // Console para diferenciar los otros consoles.