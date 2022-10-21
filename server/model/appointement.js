const mongoose = require('mongoose');

let appointmentSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    speciality:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('appointment',appointmentSchema);