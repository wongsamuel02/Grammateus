const express = require('express');
const visitController = require('../controllers/visitController');
const router = express.Router();

router.post('/create', visitController.createVisit);
router.get('/getAll/patient', visitController.getAllVisitsByPatient); // /getAll/patient?email=patient@example.com
router.get('/getAll/doctor', visitController.getAllVisitsByDoctor); // /getAll/doctor?demail=patient@example.com

module.exports = router;
