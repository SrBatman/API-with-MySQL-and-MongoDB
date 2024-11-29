const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado con MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// // MySQL connection
// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
app.use('/products', express.static(path.join(__dirname, 'uploads/products')));

// Make db connections available in req
app.use((req, res, next) => {
    // req.mysqlDb = pool;
    console.log(`Request URL: ${req.url} - ${req.method}`);
    next();
});

// Routes
app.use('/api/products', require('./routes/productos'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/login', require('./routes/login'));
app.use('/api/components', require('./routes/components'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/contactos', require('./routes/contactos'));
app.use('/api/orders', require('./routes/ordenes'));
app.use('/api/pagos', require('./routes/pagos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/subcategorias', require('./routes/subcategorias'));
app.use('/api/orderItems', require('./routes/orderItems'));

module.exports = app;
