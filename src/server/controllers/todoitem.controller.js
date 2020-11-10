//contollers for todo
const ToDoItem = require('../models/todoitem.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.todo_create = function (req, res) {
    let todo = new ToDoItem(
        {
            text: req.body.text,
            completed: req.body.completed
        },
        console.log("Todo Created")
    );

    todo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('ToDo Created successfully')
    })
};