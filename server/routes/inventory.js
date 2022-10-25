const express = require('express');
const path = require('path');
const inventoryController = require('../controller/inventoryController');
const router = express.Router();

router.post('/add', inventoryController.addInventory);
router.get('/list', inventoryController.listInventory);
router.get('/view/:id', inventoryController.viewInventory);
router.put('/edit/:id', inventoryController.editInventory);
router.delete('/delete/:id', inventoryController.deleteInventory);


module.exports = router;
