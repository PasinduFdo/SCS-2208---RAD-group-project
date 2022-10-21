const mongoose = require('mongoose');

let nurseSchema = new mongoose.Schema({
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
    ward:{
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    appointment: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('nurse',nurseSchema);