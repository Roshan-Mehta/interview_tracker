const {default : AdminBro} = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const { Company} = require('./Data/company');

const options = {
    resources : [Company],
}

module.exports = options;