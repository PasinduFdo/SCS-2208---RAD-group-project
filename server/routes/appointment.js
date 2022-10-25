const express = require('express');
const path = require('path');
const appointmentController = require('../controller/appointmentController');
const router = express.Router();

router.post('/add', appointmentController.addAppointment);
router.get('/list', appointmentController.listAppointments);
router.get('/view/:id', appointmentController.viewAppointment);
router.put('/edit/:id', appointmentController.editAppointment);
router.delete('/delete/:id', appointmentController.deleteAppointment);
router.get('/doctor', appointmentController.specificDoctor);
router.get('/list/:id', appointmentController.listAppointmentsByDoctor);


module.exports = router;
