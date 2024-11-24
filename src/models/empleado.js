const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    hire_date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Empleado', empleadoSchema);