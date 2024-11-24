const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
    
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });
    
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {

        if (err) {
            if (err.name === 'TokenExpiredError') return res.status(429).json({ message: "Token expirado" });
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user; 
        next();
    });
};

module.exports = authenticateToken