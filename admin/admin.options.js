const {default : AdminBro} = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// const { Company} = require('./Data/company');
const User = require('../models/User');
const Topic = require('../models/topics');
const Question = require('../models/question');

const options = {
    // databases : [mongooseDb]
    resources : [User, Topic, Question],
    rootPath : '/admin',
};

module.exports = options;