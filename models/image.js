const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name : String, 
    desc : String,
    img : {
        data : Buffer, 
        contenType : String
    }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;