# Curso de Node - Coderhouse

Desarrollador: Alexander Reineck  
Camada: 17060  
Tutor: ??? 

- Modo de entrega de los desafíos:
  - En el branch main siempre se va a encontrar la última versión del proyecto integrador.
  -  Los branches hijos van a estar dividor por desafío, por ejemplo, el desafío uno tendra su branch desafío uno.

# Desafío 2 - Manejo de archivos

- Formato: Carpeta comprimida con el proyecto.

- Consigna: Implementar programa que contenga una clase llamada Controlador que reciba el nombre del archivo con el que se va a trabajar e implemente los siguientes métodos:
  - save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  - getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
  - getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
  - deleteById(number): void - Elimina del archivo el objeto con el id buscado.
  - deleteAll(): void - Elimina todos los objetos presentes en el archivo.

- Aspectos a incluir en el entregable:
  - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
  - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
  - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
  - Probar el modulo creando un contenedor de productos, que se guarde en el archivo: "productos.txt"
  - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído.