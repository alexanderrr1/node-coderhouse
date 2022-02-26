import { promises as fsp } from 'fs';

class Container {
    
    constructor(fileName){
        this.fileName = fileName + '.json';
        this.encode = "utf-8";
    };

    async save(element) {
        const listOfProducts = await this.getAll();
        element.id = listOfProducts.length + 1;
        listOfProducts.push(element);
        await fsp.writeFile(`./data/${this.fileName}`, JSON.stringify(listOfProducts), this.encode);
        return element.id;
    };

    async getById(id) {
        const listOfProducts = await this.getAll();
        const foundProduct = listOfProducts.find(element => element.id === id);
        if(!foundProduct) return `El producto con id: ${id} no existe`;
        return foundProduct;
    };

    async getAll() {
        const readedData = await fsp.readFile(`./data/${this.fileName}`, this.encode);
        const firstChar = readedData.charAt(0);
        const lastChar = readedData.charAt(readedData.length - 1);
        if( firstChar != "[" || lastChar != "]")  await fsp.writeFile(`./data/${this.fileName}`, "[]", this.encode);
        return JSON.parse(await fsp.readFile(`./data/${this.fileName}`, this.encode));
    };

    async deleteById(id){
        const file = await this.getAll();
        const foundProduct = file.findIndex(element => element.id === id);
        if(foundProduct != -1){
            await this.deleteAll();
            file.splice(foundProduct, 1);
            await fsp.writeFile(`./data/${this.fileName}`, JSON.stringify(file), this.encode);
        }
        return `Deleted element with id ${id}`;
    };

    async deleteAll() {
        const emptyFile = JSON.stringify([]);
        await fsp.writeFile(`./data/${this.fileName}`, emptyFile, this.encode);
        return `All element were deleted`; 
    };

};

export default Container;