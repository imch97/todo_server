//routes for todo
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const todoitem_controller = require('../controllers/todoitem.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', todoitem_controller.test);
module.exports = router;

router.post('/create', todoitem_controller.todo_create);