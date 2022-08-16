const Product = require('./model');
const fs = require('fs');
const path = require('path');

const getProduct = async (req, res)=>{
    try{
        await Product.sync();
        const result = await Product.findAll();
        res.send(result);
    } catch (e){
        res.send(e);
    }
}


const getProductByID = async (req, res)=>{
    try{
        await Product.sync();
        const result = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(result);
    } catch (e){
        res.send(e);
    }
}


const deleteProduct = async (req, res)=>{
    try{
        await Product.sync();
        const result = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(result);
    } catch (e){
        res.send(e);
    }
}

//Create Product
const createProduct = async (req, res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        try{
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
            res.status(200).json({result})
        } catch (e){
            console.log(e);
        }
    }
}


// Update Product
const updateProduct = async (req, res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const id = req.params.id
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        try{
            await Product.sync();
            const result = await Product.update( {users_id: users_id, name: name, price: price, stock: stock, status: status, image_url: `http://localhost:3000/public/${image.originalname}`}, {where: {id}})
            res.json(result);
        } catch (e){
            res.send(e);
        }
    } else{
        try{
            await Product.sync();
            const result = await Product.update({users_id: users_id, name: name, price: price, stock: stock, status: status}, {where: {id}})
            res.json(result);
        } catch (e){
            res.send(e);
        }
    }
}


module.exports = {
    getProduct, getProductByID, deleteProduct, createProduct, updateProduct
}