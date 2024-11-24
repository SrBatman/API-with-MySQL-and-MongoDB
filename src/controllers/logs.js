
const { Logs } = require('../models/log');

exports.getAll = async (req, res) => {
    try {
        const logs = await Logs.find(); 

        if (!logs || !logs.length) return res.json({ message: 'No hay registros.', data: [] });
        console.log(logs);
        res.json({ message: 'Lista de Logs.', data: logs });
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message});
    }
}