const express = require('express')
const router = express.Router()

const todoitem_controller = require('../controllers/todoitem.controller')
const auth = require('../middleware/auth.middleware.js')

router.post('/', auth, todoitem_controller.todoCreateWithUsers)
router.get('/', auth, todoitem_controller.todoGet)
router.delete('/', auth, todoitem_controller.todoRemove)
router.put('/', auth, todoitem_controller.todoUpdate)

router.put('/all', auth, todoitem_controller.todoCompleteAll)
router.delete('/all', auth, todoitem_controller.todoDeleteCompleted)

router.get('/test', todoitem_controller.testingroute)

module.exports = router
