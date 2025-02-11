const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey1234'; 

const authenticateToken = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateToken };
