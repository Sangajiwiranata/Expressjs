const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'field nama harus ada'],
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: Number,
        require: true,
        minlength: 1000,
        maxlength: 10000000
    },
    stock: Number,
    status: {
        type: Boolean,
        require: true
    },
    image_url: {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;