const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const refreshTokenController = require('../controllers/refreshTokenController');
const router = express.Router();

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;