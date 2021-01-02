const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name : {
        type:String, 
        required : true,

    },
    question : {
        type : String, 
        required : true
    }
    
})

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;