const db = require('../../db'); 
const jwt = require('jsonwebtoken');


const createUser = (req, res) => {
    const { name, email, password,  role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, Email, and Password are required' });
    }

    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const values = [name, email, password|| null, role || 'user'];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
};

const SECRET_KEY = 'secretkey1234';

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id,name: user.name, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.json({ message: 'Login successful', token,user  });
    });
};

module.exports = { createUser, loginUser };
