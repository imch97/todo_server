
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDoSchema = new Schema({
    text: {type: String, required: true, max: 100},
    completed: {type: Boolean, required: true},
    //user_id: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('ToDoItems', ToDoSchema);
