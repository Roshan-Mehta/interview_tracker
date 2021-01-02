const {default : AdminBro} = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const { Company} = require('./Data/company');
const User = require('../models/User');

const options = (mongooseDb) => {
    // databases : [mongooseDb]
    resource : [Company]
};

module.exports = options;