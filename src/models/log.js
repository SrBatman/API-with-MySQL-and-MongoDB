const mongoose = require('mongoose');

/**
 * @typedef {Object} Logs
 * @property {string} user
 * @property {string} message
 * @property {string} action
 * @property {string} before
 * @property {string} after
 */

/**
 * @type {Schema<Logs>}
 */

const logSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    action: { type: String, required: true },
    before: { type: Object, default: null },
    after: { type: Object, default: null }
}, { timestamps: true });

exports.Logs = mongoose.model('Log', logSchema);
