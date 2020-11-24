//routes for todo
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const todoitem_controller = require('../controllers/todoitem.controller');
const auth = require('../middleware/auth.middleware.js')


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', todoitem_controller.test);
module.exports = router;

//CRUD
router.post('/', todoitem_controller.todo_create);
router.get('/', todoitem_controller.todo_details);
router.put('/update', todoitem_controller.todo_update);
router.delete('/delete', todoitem_controller.todo_delete);

router.get('/all', todoitem_controller.todo_getAll);

router.post('/',auth, todoitem_controller.todo_create_with_users)
router.get('/',auth,todoitem_controller.todo_get);