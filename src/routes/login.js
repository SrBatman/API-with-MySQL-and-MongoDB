const express = require('express');
const router = express.Router();
const { Token } = require('../controllers/login');

router.post('/', Token);

module.exports = router;