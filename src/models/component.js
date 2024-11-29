const { model, Schema } = require('mongoose');

/**
 * @typedef {Object} Component
 * @property {string} name
 * @property {string} value
 * */
/**
 * @typedef {Schema<Component>}
 */

const componentSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
}, { timestamps: true });


exports.Component = model('Component', componentSchema);