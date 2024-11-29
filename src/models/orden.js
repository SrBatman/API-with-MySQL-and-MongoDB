const { model, Schema} = require('mongoose');

/**
 * @typedef {Object} Order
 * @property {number} user_id 
 * @property {string} tracking_no 
 * @property {string} fullname 
 * @property {string} email 
 * @property {string} phone
 * @property {string} pincode 
 * @property {string} address 
 * @property {string} status_message 
 * @property {string} payment_mode
 * @property {string|null} payment_id 
 */

/**
 * @type {Schema<Order>}
 */

const orderSchema = new Schema({
    user_id: { type: Number, required: true, index: true }, 
    tracking_no: { type: String, required: true, unique: true }, 
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    status_message: { type: String, required: true },
    payment_mode: { type: String, required: true },
    payment_id: { type: Number, default: null },
   
}, {
    timestamps: true,
});


exports.Order = model('Order', orderSchema);
