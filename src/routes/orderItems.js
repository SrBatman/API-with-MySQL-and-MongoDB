const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderItem');

// Create
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const orderItem = new OrderItem(req.body);
        await orderItem.save();
        res.status(201).json(orderItem);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find().populate('order_id product_id');
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id).populate('order_id product_id');
        if (!orderItem) return res.status(404).json({ message: 'Order Item no encontrado' });
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orderItem) return res.status(404).json({ message: 'Order Item no encontrado' });
        res.json(orderItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!orderItem) return res.status(404).json({ message: 'Order Item no encontrado' });
        res.json({ message: 'Order Item eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
