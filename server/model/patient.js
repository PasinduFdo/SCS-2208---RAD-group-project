const mongoose = require('mongoose');

let patientSchema = new mongoose.Schema({
    nic: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    ward:{
        type: String,
        required: true
    },
    admittedDate: {
        type: Date,
        required: true
    },
    admittedHistory: {
        date: {
            type: Array,
            required: false
        },
        description: {
            type: Array,
            required: false
        }
    }
})

module.exports = mongoose.model('patient',patientSchema);