const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/', authController.authenticateUser);

module.exports = router;