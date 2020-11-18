//contollers for todo
//const { default: TodoItem } = require('../../app/Components/TodoItem/TodoItem');
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
    
    );
    console.log("Todo Created: ", todo)
    todo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('ToDo Created successfully')
    })
};

exports.todo_details = function (req, res) {
    ToDoItem.findById(req.body.id, function (err, todo) {
        if (err) return next(err);
        res.send(todo);
    })
};

exports.todo_update = function (req, res) {
    ToDoItem.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err, todo) {
        if (err) return next(err);
        res.send('ToDo udpated.');
    });
};


exports.todo_delete = function (req, res) {
    ToDoItem.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.todo_getAll = function (req, res) {
    ToDoItem.find({}, null, {sort: 'критерий сортировки'},function (err, todos) {
        //console.log (res); //вот здесь будут все документы
        
        res.send(todos); 
    });
    
}
