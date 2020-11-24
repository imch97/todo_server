
//const { ObjectId } = require('mongodb');
const {mongoose, Types} = require('mongoose');
const Schema = mongoose.Schema;

let ToDoSchema = new Schema({
    //_id: {type: Schema.Types.ObjectId, index: true, auto: true,},
    text: {type: String, required: true, max: 100},
    completed: {type: Boolean, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
});


// Export the model
module.exports = mongoose.model('ToDoItems', ToDoSchema);
