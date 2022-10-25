const express = require('express');
const path = require('path');
const patientController = require('../controller/patientController');
const router = express.Router();

router.post('/add', patientController.addPatient);
router.get('/list', patientController.listPatients);
router.get('/wards', patientController.wards);
router.get('/list/:id', patientController.listwardPatients);
router.get('/view/:id', patientController.viewPatient);
router.put('/edit/:id', patientController.editPatient);
router.delete('/delete/:id', patientController.deletePatient);


module.exports = router;
