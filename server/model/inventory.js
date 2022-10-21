const mongoose = require('mongoose');

let inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    ward:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('inventory',inventorySchema);