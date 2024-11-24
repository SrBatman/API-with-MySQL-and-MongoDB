const express = require('express');
const router = express.Router();
const { Product } = require('../models/producto');
const { decryptData, encryptData } = require('../utils/crypto');
const { Categories } = require('../tables/categories');
const { Subcategories } = require('../tables/subcategories');

router.post('/', async (req, res) => {
    try {
        const requestData = decryptData(req.body.data);

        // Validar que la categoría y subcategoría existan en MySQL
        const categoria = await Categories.findByPk(requestData.category_id);
        const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);

        if (!categoria || !subcategoria) {
            return res.status(400).json(encryptData({ message: 'Categoría o subcategoría no válida' }));
        }

        
        const producto = new Product(requestData);
        await producto.save();

        res.status(201).json(encryptData(producto));
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json(encryptData({ message: error.message }));
    }
});

// Read all Productos
router.get('/', async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(encryptData(productos));
    } catch (error) {
        res.status(500).json(encryptData({ message: error.message }));
    }
});

// Read one Producto
router.get('/:id', async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json(encryptData({ message: 'Producto no encontrado' }));
        res.json(encryptData(producto));
    } catch (error) {
        res.status(500).json(encryptData({ message: error.message }));
    }
});

// Update Producto
router.put('/:id', async (req, res) => {
    try {
        const requestData = decryptData(req.body.data);

        // Validar que la categoría y subcategoría existan en MySQL
        const categoria = await Categories.findByPk(requestData.category_id);
        const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);

        if (!categoria || !subcategoria) {
            return res.status(400).json(encryptData({ message: 'Categoría o subcategoría no válida' }));
        }

        const producto = await Product.findByIdAndUpdate(req.params.id, requestData, { new: true });
        if (!producto) return res.status(404).json(encryptData({ message: 'Producto no encontrado' }));

        res.json(encryptData(producto));
    } catch (error) {
        res.status(400).json(encryptData({ message: error.message }));
    }
});

// Delete Producto
router.delete('/:id', async (req, res) => {
    try {
        const producto = await Product.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json(encryptData({ message: 'Producto no encontrado' }));
        res.json(encryptData({ message: 'Producto eliminado' }));
    } catch (error) {
        res.status(500).json(encryptData({ message: error.message }));
    }
});

module.exports = router;