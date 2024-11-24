const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    twitter_id: { type: String, default: null },
    facebook_id: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    two_factor_secret: { type: String, default: null },
    two_factor_recovery_codes: { type: [String], default: [] },
    two_factor_confirmed_at: { type: Date, default: null },
    remember_token: { type: String, default: null },
    current_team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    role_as: { type: String, enum: ['admin', 'user', 'editor'], default: 'user' },
    profile_photo_path: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
