const express = require('express')
const patientController = require('../../controllers/patientController');
const router = express.Router();

router.post('/create', patientController.createPatient);
router.post('/addReasonOfVisitForPatient', patientController.addReasonOfVisitForPatient);
router.get('/getAll', patientController.getAllPatients);
router.get('/get', patientController.getPatient);
router.put('/modify', patientController.modifyPatientInfo);

module.exports = router;