const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
