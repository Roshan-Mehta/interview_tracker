const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    topic : {
        type : String,
        required : true
    },
    name : {
        type : String,
        require : true
    },
    content : {
        type : String,
        required : true
    }

});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;