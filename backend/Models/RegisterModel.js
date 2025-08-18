const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Register",regSchema);

