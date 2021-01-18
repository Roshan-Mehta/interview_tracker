const User = require("../models/User");

const adminEmails = ['roshan@gmail.com', 'myshizu@gmail.com'];

const AdminCheck = (req, res) => {
    const user = res.locals.user;
    if (user) {
        const currentEmail = user.email;
        let a = 0;
        adminEmails.forEach((email) => {
            if (email == currentEmail) {
                a = 1;
            }
        })
        if (a == 1) {
            return true;
        }

    }
    return false;
}

const reqAdminAuth = (req, res, next) => {

    if (AdminCheck(req, res)) {
        next();
    }
    else {   
        res.redirect('/error');
        next();
        
    }
    
}

module.exports = {AdminCheck, reqAdminAuth};