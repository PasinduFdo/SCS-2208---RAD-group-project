const express = require('express');
const path = require('path');
const doctorController = require('../controller/doctorController');
// const loginValidation = require('../controller/loginvalidation');
const router = express.Router();

router.post('/add', doctorController.addDoctor);
router.get('/list', doctorController.listDoctors);
router.get('/specialities', doctorController.Specialities);
router.get('/list/:id', doctorController.listspecialDoctor);
router.get('/view/:id', doctorController.viewDoctor);
router.put('/edit/:id', doctorController.editDoctor);
router.delete('/delete/:id', doctorController.deleteDoctor);


module.exports = router;
