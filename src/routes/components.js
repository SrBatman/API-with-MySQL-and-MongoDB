const express = require('express');
const router = express.Router();
const {
    createComponent,
    getAllComponents,
    getComponentById,
    updateComponentById,
    deleteComponentById
} = require('../controllers/component');
const authenticateToken = require('../middlewares/auth');

// Create
router.post('/', authenticateToken, createComponent);

// Read all
router.get('/', authenticateToken, getAllComponents);

// Read one
router.get('/:id', authenticateToken, getComponentById);

// Update
router.put('/:id', authenticateToken, updateComponentById);

// Delete
router.delete('/:id', authenticateToken, deleteComponentById);

module.exports = router;