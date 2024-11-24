const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/logs');
const authenticateToken = require('../middlewares/auth');


router.get('/', authenticateToken, getAll);


module.exports = router;