import Container from './classes/Container.js';

const container = new Container('data');

const elementTest = {
    "title": "Mouse",
    "price": 123.45,
    "thumbnail": "asdasddadsd.png"
};

for(let i = 0; i < 5 ; i++){
    await container.save(elementTest);
};

await container.getById(2);
await container.getAll();
await container.deleteById(2);
await container.deleteAll();


