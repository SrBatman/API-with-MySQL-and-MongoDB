const express = require('express');
const router = express.Router();
const Pago = require('../models/pago');

// Create
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const pago = new Pago(req.body);
        await pago.save();
        res.status(201).json(pago);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.find();
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const pago = await Pago.findById(req.params.id);
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.json(pago);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.json(pago);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByIdAndDelete(req.params.id);
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.json({ message: 'Pago eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
