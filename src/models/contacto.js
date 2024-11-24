const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pendiente', 'resuelto', 'en proceso'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Contacto', contactoSchema);
