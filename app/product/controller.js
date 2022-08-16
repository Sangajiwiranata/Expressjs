const connection = require('../../config/mysql')
const fs = require('fs');
const path = require('path');


//Read Database
const index = (req, res)=>{
    connection.query({
        sql: 'SELECT * FROM tbl_barang'
    }, _respon(res))
}
const view = (req, res)=>{
    connection.query({
        sql: 'SELECT * FROM tbl_barang WHERE id=?',
        values: [req.params.id]
    }, _respon(res))
}

const destroy = (req, res)=>{
    connection.query({
        sql: 'DELETE FROM tbl_barang WHERE id=?',
        values: [req.params.id]
    }, _respon(res))
}


//Input Record Database
const store = (req, res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        connection.query({
            sql: 'INSERT INTO tbl_barang (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            values: [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`]
        }, _respon(res))
    }
}


//Edit Record Database
const update = (req, res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        sql= 'UPDATE tbl_barang SET users_id=?, name=?, price=?, stock=?, status=?, image_url=? WHERE id=?';
        values= [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id]
    } else {
        sql= 'UPDATE tbl_barang SET users_id=?, name=?, price=?, stock=?, status=? WHERE id=?';
        values= [parseInt(users_id), name, price, stock, status, req.params.id]}
        connection.query({sql, values}, _respon(res))
}


const _respon =(res)=> {
    return (error, result)=> {
            if(error){
                res.send({
                    status: 'failed',
                    response: error
                })
            }else{
                res.send({
                    status: 'Succes',
                    response: result
                })
            }
        }
}

module.exports ={
    index, view, store, update, destroy
}