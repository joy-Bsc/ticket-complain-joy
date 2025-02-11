

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticket'
});

db.connect(function(err) {
    if (err) {
        console.log('db Connection error');
    } else {
        console.log('Database connected');
    }
}
);

module.exports = db;
