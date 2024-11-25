const { Categories } = require('../tables/categories');
const { Subcategories } = require('../tables/subcategories');
const { Brands } = require('../tables/brands');
const { Logs } = require('../models/log');
const { Product } = require('../models/producto');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/products')); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now().toString().slice(5)}` + '-' + Math.round(Math.random() * 1E4);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Nombre único para el archivo
    }
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Validar el tipo de archivo
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('El archivo debe ser una imagen válida'));
        }
    }
});

exports.getAll = async (req, res) => {
    try {
        const data = await Product.find();
        if (!data || !data.length) return res.json({ message: 'No hay productos', data: [] });
        const cs = await Categories.findAll();
        const categories = {};
        cs.forEach(c => categories[c.id] = c.name);

        //Esto para agregar el nombre de la categoría al producto
        const products = data.map((p) => ({
            ...p.toObject(),
            categoryName: categories[p.category_id] || 'Sin categoría'
        }));
        
        res.json({ message: 'Lista de productos.', data: products });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Create a new product
exports.create = async (req, res) => {
    try {

        upload.single('file')(req, res, async (err) => {
            const requestData = req.body;
            const categoria = await Categories.findByPk(requestData.category_id);
            const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);
            if (!categoria || !subcategoria) return res.status(400).json({ message: 'Categoría o subcategoría no válida' });
            if (err) {
                return res.status(400).json({ message: 'Error al subir el archivo', details: err.message });
            }



            // Generar el slug a partir del nombre
            requestData.slug = generateSlug(requestData.name, requestData.brand);

            // Si se subió un archivo, añadir su ruta al requestData
            if (req.file) {
                const filePath = path.join('products', req.file.filename);
                requestData.image = `${req.protocol}://${req.get('host')}/${filePath}`;
            }

            const producto = new Product(requestData);
            await producto.save();

            res.status(201).json({
                message: 'Producto creado',
                data: producto
            });
        });
        // const requestData = req.body;

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

// Read a product by ID
exports.getEditInfo = async (req, res) => {
  
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        const subcategory = await Subcategories.findOne({
            where: { id: product.subcategory_id }, 
        });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategoría no encontrada en MySQL' });
        }

        const allSubcategories = await Subcategories.findAll();

        const relatedSubcategories = await Subcategories.findAll({
            where: { category_id: subcategory.category_id },
        });

       
        const allCategories = await Categories.findAll();

        const brands = await Brands.findAll();
        
        res.json({ message: 'Información del producto', data: { 
            product, 
            allSubcategories,
            relatedSubcategories,
            allCategories,
            brands
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateById = async (req, res) => {
    try {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error al subir el archivo', details: err.message });
            }

            const requestData = req.body;

            // Validar que la categoría y subcategoría existan en MySQL
            const categoria = await Categories.findByPk(requestData.category_id);
            const subcategoria = await Subcategories.findByPk(requestData.subcategory_id);

            if (!categoria || !subcategoria) {
                return res.status(400).json({ message: 'Categoría o subcategoría no válida' });
            }

            const producto = await Product.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Procesar la nueva imagen si existe
            if (req.file) {
                const newFilePath = path.join('products', req.file.filename);
                const newImageUrl = `${req.protocol}://${req.get('host')}/${newFilePath}`;

                // Eliminar la imagen anterior del servidor si existe
                if (producto.image) {
                    const oldFilePath = path.join(__dirname, '../uploads', producto.image.split('/').slice(-2).join('/'));
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                // Actualizar la ruta de la imagen en los datos de la solicitud
                requestData.image = newImageUrl;
            }

            // Actualizar el producto en la base de datos
            console.log('requestData:', requestData);
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, requestData, { new: true });
            if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });

            res.json({
                message: 'Producto actualizado con éxito',
                data: updatedProduct
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

/**
requestData: {
  name: 'Prueba',
  brand: 'CASE',
  description: 'Un ejemplo',
  price: '15',
  file: null,
  status: 0,
  stock: '34',
  category_id: '1',
  subcategory_id: '4'
}
 */

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


function generateSlug(name, brand) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') + '-' +
        brand.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
};


