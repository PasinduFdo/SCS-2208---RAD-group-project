const express = require('express');
const path = require('path');
const nurseController = require('../controller/nurseController');
const router = express.Router();

router.post('/add', nurseController.addNurse);
router.get('/list', nurseController.listNurses);
router.get('/wards', nurseController.wards);
router.get('/list/:id', nurseController.listwardNurse);
router.get('/view/:id', nurseController.viewNurse);
router.put('/edit/:id', nurseController.editNurse);
router.delete('/delete/:id', nurseController.deleteNurse);


module.exports = router;