const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('user',userSchema);