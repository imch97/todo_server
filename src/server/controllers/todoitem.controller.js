//contollers for todo
//const { default: TodoItem } = require('../../app/Components/TodoItem/TodoItem');
const ToDoItem = require('../models/todoitem.model');
//const auth = require('../middleware/auth.middleware.js')
const {BASE_URL,JWT_SECRET} = require('../constans/constans.js')

const jwt = require('jsonwebtoken')


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

// exports.todo_update = function (req, res) {
//     ToDoItem.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err, todo) {
//         if (err) return next(err);
//         res.send('ToDo udpated.');
//     });
// };


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

//logic methods for

exports.todo_create_with_users = async function(req, res){
    try {
        
        const {text} = req.body           
    
            
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET)
        
        const todoitem = new ToDoItem({
            text, completed:false, owner: decoded.userId
        })
        
        await todoitem.save()
    
        res.status(201).json({ todoitem })
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.todo_get = async function (req,res){
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        //const token = req.headers.authorization;
        const decoded = jwt.verify(token, JWT_SECRET)
        
        const todoitem = await ToDoItem.find({ owner: decoded.userId })
        res.json(todoitem)
        console.log('sub_item ', todoitem)
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
}

exports.todo_remove = async function (req, res){
    try{
        const {_id} = req.body 

        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, JWT_SECRET)

        await ToDoItem.findByIdAndRemove({ _id },function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        })

    }catch(e){
        console.log(e);
    }
}

exports.todo_update = async function (req, res){
    try {
        //const {_id,} = req.body;
        

        await ToDoItem.findByIdAndUpdate(req.body._id, {$set: req.body},function (err) {
            if (err) return next(err);
            res.send('ToDo udpated.');
        })

        
    } catch (e) {
        
    }
}

 //const update_completed = !completed


        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, JWT_SECRET)