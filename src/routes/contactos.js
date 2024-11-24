const express = require('express');
const router = express.Router();
const Contacto = require('../models/contacto');

// Create
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const contacto = new Contacto(req.body);
        await contacto.save();
        res.status(201).json(contacto);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const contactos = await Contacto.find();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const contacto = await Contacto.findById(req.params.id);
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        res.json(contacto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const contacto = await Contacto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        res.json(contacto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const contacto = await Contacto.findByIdAndDelete(req.params.id);
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        res.json({ message: 'Contacto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
