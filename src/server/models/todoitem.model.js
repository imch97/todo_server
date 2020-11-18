
//const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDoSchema = new Schema({
    //_id: {type: Schema.Types.ObjectId, index: true, auto: true,},
    text: {type: String, required: true, max: 100},
    completed: {type: Boolean, required: true},
    //user_id: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('ToDoItems', ToDoSchema);
