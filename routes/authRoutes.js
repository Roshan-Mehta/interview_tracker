const { Router } = require('express');
const authController = require('../controllers/authController');
const Quest = require('../models/question');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/questions', authController.get_question);
router.get('/questions/:id', (req, res) => {
    const id = req.params.id;
    Quest.findById(id).then((result) => {
        res.render('details',{ question : result });
    }) .catch((error) => console.log(error));

})

module.exports = router;