const express = require('express');
const router = express.Router();
const Orden = require('../models/orden');

// Create
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const orden = new Orden(req.body);
        await orden.save();
        res.status(201).json(orden);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(orden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(orden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const orden = await Orden.findByIdAndDelete(req.params.id);
        if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json({ message: 'Orden eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
