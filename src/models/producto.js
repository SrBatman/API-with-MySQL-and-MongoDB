const mongoose = require('mongoose');

/**
 * @typedef {Object} Product
 * @property {string} name
 * @property {string} slug
 * @property {string} brand
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {number} status
 * @property {number} stock
 * @property {number} category_id
 * @property {number} subcategory_id
 */

/**
 * @type {Schema<Product>}
 */

const productoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true }, 
    brand: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    status: { type: Number, required: true, index: true }, 
    stock: { type: Number, default: 0 },
    category_id: { type: Number, required: true, index: true }, 
    subcategory_id: { type: Number, required: true, index: true }, 
}, { timestamps: true });


productoSchema.index({ category_id: 1, subcategory_id: 1 });

exports.Product = mongoose.model('Products', productoSchema);
