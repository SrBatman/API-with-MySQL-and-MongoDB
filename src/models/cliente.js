const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
