const express = require('express');
const router = express.Router();

const { 
    getAll, 
    create, 
    getById, 
    updateById, 
    deleteById 
} = require('../controllers/brands');
const authenticateToken = require('../middlewares/auth');


router.get('/', authenticateToken, getAll);


router.post('/', authenticateToken, create);



router.get('/:id', authenticateToken, getById);


router.put('/:id', authenticateToken, updateById);


router.delete('/:id', authenticateToken, deleteById);

module.exports = router;