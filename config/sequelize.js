const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: 'eduwork',
    username: 'admin',
    password: 'admin', 
    host: '127.0.0.1',
    dialect: 'mysql' 
});

(async ()=> {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
})();


module.exports = db;