const express = require('express')
const patientController = require('../../controllers/patientController');
const router = express.Router();

router.post('/create', patientController.createPatient);
router.post('/addReasonOfVisitForPatient', patientController.addReasonOfVisitForPatient);
router.get('/getAll', patientController.getAllPatients);
router.get('/get', patientController.getPatient);
router.put('/modify', patientController.modifyPatientInfo);

// Search patients endpoint
router.get('/api/patients/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const patients = await Patient.find({ name: { $regex: query, $options: 'i' } }).limit(10); // Case-insensitive search
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;


module.exports = router;