const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, enum: ['pendiente', 'pagado', 'cancelado'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Orden', ordenSchema);
