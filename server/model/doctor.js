const mongoose = require('mongoose');

let doctorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    speciality: {
        type: String,
        required: true
    },
    ward:{
        type: String,
        required: true
    },
    appointment: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('doctor',doctorSchema);