const express = require('express')
const patientController = require('../../controllers/patientController');
const router = express.Router();

router.post('/create', patientController.createPatient);
router.put('/modify', patientController.modifyPatientInfo);
router.get('/search', patientController.searchPatient);

module.exports = router;