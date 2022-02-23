const { response, request } = require('express');
const fs = require('fs');

const db = './db/products.txt';
const utf = 'utf-8';

const productsGet = (req = request, res = response) => {
    fs.readFile(db, utf, (error, data) => {
        if (error) throw error;
        const products  = JSON.parse(data);
        res.json({
            products
        });
    });
}

const productsGetById = (req = request, res = response) => {
    fs.readFile(db, utf, (error, data) => {
        if (error) throw error;
        const products  = JSON.parse(data);
        let foundProduct = products.find(product => product.id === req.params.id );
        if( !foundProduct ){ 
            return res.status(400).json({
                msg : `Product with ID: ${req.params.id} not found`
            });
        }
        res.json({
            product : findedProduct
        });
    });
}

const productsPost = (req = request, res = response) => {
    fs.readFile(db, utf, (error, data) => {
        if(error) throw error;
        const products  = JSON.parse(data);
        const newProduct = {
            title: 'NewProduct',
            price: '444.44',
            thumbnail: 'https://thumbnailnuevo.com',
            id: '$2a$12$wasdsadadadasdasddasdasdasdadaWY/fwanuevovCZ9KJ6'
        };
        products.push(newProduct);
        fs.writeFile(db, JSON.stringify(products), utf, (error, data) => {

            if(error) throw error;

            res.json({
                products
            });
        });
    });
}

module.exports = {
    productsGet,
    productsPost,
    productsGetById
}