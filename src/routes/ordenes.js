const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');
const authenticateToken = require('../middlewares/auth');


// Create
router.post('/', authenticateToken, createOrder);

// Read all
router.get('/', authenticateToken, getAllOrders);

// Read one
router.get('/:id', authenticateToken, getOrderById);

// Update
router.put('/:id', authenticateToken, updateOrder);

// Delete
router.delete('/:id', authenticateToken, deleteOrder);

module.exports = router;
