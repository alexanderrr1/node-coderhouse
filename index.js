import Container from './classes/Container.js';

(async function main () {
    
    const container = new Container('data');
    
    const elementTest = {
        "title": "Mouse",
        "price": 123.45,
        "thumbnail": "asdasddadsd.png"
    };
    
    await container.save(elementTest);
    await container.getById(2);
    await container.getAll();
    await container.deleteById(2);
    await container.deleteAll();

})();



