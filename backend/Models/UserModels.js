const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },


});

module.exports = mongoose.model("UserModels",userSchema);