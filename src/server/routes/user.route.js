//routes for user
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
module.exports = router;



//logic user app
router.post('/register',
[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов')
      .isLength({ min: 8 })
]
,user_controller.register);



router.post('/login',
[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов')
      .isLength({ min: 8 })
]
,user_controller.login);