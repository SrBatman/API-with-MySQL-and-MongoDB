const { Brands } = require('../tables/brands');
const { Logs } = require('../models/log');

exports.getAll = async (req, res) => {
    try {
        const brands = await Brands.findAll(); // Consulta todas las Proveedors

        if (!brands || !brands.length) return res.json({ message: 'No hay proveedores', data: [] });

        res.json({ message: 'Lista de Proveedores.', data: brands });
        // res.json({ data: encryptData(brands) });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message});
    }
}

// Create a new brand
exports.create = async (req, res) => {
    try {
        const requestData = req.body;
        const adminName = requestData.admin
        delete requestData.admin

        const brand = await Brands.create(requestData);

        await Logs.create({ user: adminName, message: `Se ha agregado proveedor: ${requestData.name}.`, action: 'Agregado',  after: requestData });
        res.status(201).json({ message: 'Proveedor creado', data: brand });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Read a brand by ID
exports.getById = async (req, res) => {
    try {
        const brand = await Brands.findByPk(req.params.id); // Buscar por la clave primaria
        if (!brand) return res.status(404).json({ message: 'Proveedor no encontrado' });

        
        res.json({ message: 'Proveedor encontrada', data: brand });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update a brand by ID
exports.updateById = async (req, res) => {
    try {
        const requestData = req.body;
        const adminName = requestData.admin
        delete requestData.admin
        const before = await Brands.findByPk(req.params.id);
        const updatedRows = await Brands.update(requestData, {
            where: { id: req.params.id },
            returning: true, // Devuelve los registros actualizados
        });

        // Si no se actualizó ninguna fila
        
        if (!updatedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });

        await Logs.create({ user: adminName, message: `Se ha actualizado el proveedor: ${before.name}.`, action: 'Modificado', before, after: requestData  });
        res.json({
            message: 'Proveedor actualizada con éxito',
            // data: updatedRows,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Delete a brand by ID
exports.deleteById = async (req, res) => {
    try {
        const brand = await Brands.findByPk(req.params.id);
        const adminName = req.body.admin
        const deletedRows = await Brands.destroy({
            where: { id: req.params.id },
        });

        if (!deletedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });
        await Logs.create({ user: adminName, message: `Se ha eliminado el proveedor: ${brand.name}.`, action: 'Eliminado'  });
        res.json({ message: 'Proveedor eliminada' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};