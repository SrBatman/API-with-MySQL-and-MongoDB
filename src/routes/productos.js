const express = require('express');
const router = express.Router();

const { 
    getAll, 
    create, 
    getById, 
    updateById, 
    deleteById,
    getEditInfo 
} = require('../controllers/products');
const authenticateToken = require('../middlewares/auth');



router.get('/', authenticateToken, getAll);

router.get('/getEditInfo/:id', authenticateToken, getEditInfo);


router.get('/:id', authenticateToken, getById);

router.post('/', authenticateToken, create);

router.put('/:id', authenticateToken, updateById);


router.delete('/:id', authenticateToken, deleteById);

module.exports = router;