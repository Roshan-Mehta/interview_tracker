const mongoose = require('mongoose');
const Company = require('./Company');

const ExperienceSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    image : {
        type : String,
    },
    branch : {
        type : String,

    },
    year : {
        type : Number,
    },
    company : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'company',
        required : true
    },
    experience : {
        type : Number
    }

});


const Experience = mongoose.model('experience', ExperienceSchema);

module.exports = Experience;