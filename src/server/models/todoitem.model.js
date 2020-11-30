const mongoose = require('mongoose')
const { Types } = require('mongoose')
const Schema = mongoose.Schema

let ToDoSchema = new Schema({
	text: { type: String, required: true, max: 100 },
	completed: { type: Boolean, required: true },
	owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('ToDoItems', ToDoSchema)
