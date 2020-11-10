//contollers for todo
const ToDoItem = require('../models/todoitem.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};