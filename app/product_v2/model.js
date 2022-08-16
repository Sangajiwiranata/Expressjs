const {Sequelize} = require('sequelize');
const db = require('../../config/sequelize');
const {DataTypes} = Sequelize;

const Product = db.define('Product', {
    users_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    price: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    stock: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
    },
    status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
    // allowNull defaults to true
    },
    image_url: {
    type: DataTypes.TEXT,
    allowNull: false
    },
}, {
  // Other model options go here
});

module.exports = Product;