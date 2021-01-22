const multer = require('multer');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage : storage});
const {Router} = require('express');
const router = Router();
const Image = require('../models/image');

router.get('/products', (req, res) => {
    Image.find({}, (err, items) => {
        if (err){
            console.log(err);
        }
        else {
            res.render('imageView', {items : items});
        }
    });
});

router.post('/products', upload.single('image'), (req, res, next) => {
    // console.log("req :  ", req.body);
    // console.log("Here we go : ", req.file);
    console.log(req.file.fieldname);
    var object = {
        name : req.body.name, 
        desc : req.body.desc,
        img : {
            data : fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType : 'image/png'
        },
    
        
    }
    // console.log('object : ', object);
    Image.create(object, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    })
})

module.exports = router;