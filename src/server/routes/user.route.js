//routes for user
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
module.exports = router;

//CRUD
router.post('/', user_controller.user_create);
router.get('/', user_controller.user_details);
router.put('/update', user_controller.user_update);
router.delete('/delete', user_controller.user_delete);