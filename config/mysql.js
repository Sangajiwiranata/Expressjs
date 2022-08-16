var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'admin',
password : 'admin',
database : 'eduwork-nodejs'
});

module.exports = connection;