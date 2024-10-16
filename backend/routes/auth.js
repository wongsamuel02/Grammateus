const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/', authController.authenticateUser);

router.get('/secret', verifyJWT, (req, res) => {
    res.json({ message: "supper secret message to test Authentication" })
})

router.get('/authenticateToken', verifyJWT, (req, res) => {
    res.json({ message: "supper secret message" })
})

module.exports = router;