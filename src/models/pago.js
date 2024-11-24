const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    meta_title: { type: String },
    meta_keyword: { type: String },
    meta_description: { type: String },
    status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Pago', pagoSchema);
