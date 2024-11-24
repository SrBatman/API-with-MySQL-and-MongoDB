const { Categories } = require('../tables/categories');
const { Subcategories } = require('../tables/subcategories');
const { Logs } = require('../models/log');
const { Product } = require('../models/producto');

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find(); 
        if (!products || !products.length) return res.json({ message: 'No hay productos', data: [] });

        res.json({ message: 'Lista de productos.', data: products });
       
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message});
    }
}

// Create a new product
exports.create = async (req, res) => {
    try {
        const requestData = req.body.data;

        // Validar que la categoría y subcategoría existan en MySQL
        const categoria = await Categories.findByPk(requestData.category_id);
        const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);

        if (!categoria || !subcategoria) return res.status(400).json({ message: 'Categoría o subcategoría no válida' });

        
        const producto = new Product(requestData);
        await producto.save();

        res.status(201).json(producto);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Read a product by ID
exports.getById = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateById = async (req, res) => {
    try {
        const requestData = req.body.data;

        // Validar que la categoría y subcategoría existan en MySQL
        const categoria = await Categories.findByPk(requestData.category_id);
        const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);

        if (!categoria || !subcategoria) {
            return res.status(400).json({ message: 'Categoría o subcategoría no válida' });
        }

        const producto = await Product.findByIdAndUpdate(req.params.id, requestData, { new: true });
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteById = async (req, res) => {
    try {
        const producto = await Product.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};