import * as fs from 'fs';

class Contenedor {
    
    constructor(fileName){
        this.fileName = fileName + '.json';
    };

    save(elemento) {
        let archivo = this.getAll();
        let newIndex = archivo.length + 1;
        elemento.id = newIndex;
        archivo.push(elemento);
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(archivo), 'utf-8');
        return newIndex;
    };

    getById(number) {
        let archivo = this.getAll();
        let elementFinded = archivo.find(element => element.id === number);
        return elementFinded;
    };

    getAll() {
        let lectura = fs.readFileSync(`./data/${this.fileName}`, 'utf-8');
        return JSON.parse(lectura);
    };

    deleteById(number){
        let archivo = this.getAll();
        let elementFinded = archivo.findIndex(element => element.id === number);
        if(elementFinded != -1){
            console.log("entre")
            this.deleteAll();
            archivo.splice(elementFinded, 1);
            fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(archivo), 'utf-8')
        }
        console.log(archivo)
    }

    deleteAll() {
        let emptyFile = JSON.stringify([]);
        fs.writeFileSync(`./data/${this.fileName}`, emptyFile, 'utf-8')
    };

}

export default Contenedor;