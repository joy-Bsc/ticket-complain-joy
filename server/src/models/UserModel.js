const db = require('../../db');

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(createUserTable, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('User table created successfully!');
    }
   
});


 module.exports = {
    createUserTable 
 }


