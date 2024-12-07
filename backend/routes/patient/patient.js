const express = require('express')
const patientController = require('../../controllers/patientController');
const router = express.Router();

router.post('/create', patientController.createPatient);
router.get('/getAll', patientController.getAllPatients);
router.get('/get', patientController.getPatient);
router.put('/modify', patientController.modifyPatientInfo);
router.get('/api/patients/search', patientController.searchPatient);

module.exports = router;