const Product = require('./model')
const fs = require('fs');
const path = require('path');

const createProduct = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        Product.create({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
};

const index = (req, res) => {
    Product.find()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const deleteProduct = (req, res) => {
    const {id} = req.params;
    Product.deleteOne({_id: id})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const view = (req, res) => {
    const {id} = req.params;
    Product.findById({_id: id})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const editProduct = (req, res) => {
    const {name, price, stock, status} = req.body;
    const id = req.params.id
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        Product.updateOne({_id: id}, {$set: {name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`}})
        .then(result => res.send(result))
        .catch(error => res.send(error));
        
    } else{
        Product.updateOne({_id: id}, {$set: {name, price, stock, status, image_url: ``}})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
};

module.exports = {
    createProduct, index, deleteProduct, view, editProduct
}
