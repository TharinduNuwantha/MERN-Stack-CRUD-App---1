const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
    Image:{
        type: String,
        required: true
    },


});

module.exports = mongoose.model("ImageFiles",ImgSchema);

