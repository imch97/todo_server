const jwt = require('jsonwebtoken')

const ToDoItem = require('../models/todoitem.model')

exports.todoCreateWithUsers = async function (req, res) {
	try {
		const { text } = req.body

		const token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const todoitem = new ToDoItem({
			text,
			completed: false,
			owner: decoded.userId,
		})

		await todoitem.save()

		res.status(201).json({ todoitem })
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
}

exports.todoGet = async function (req, res) {
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const todoitem = await ToDoItem.find({ owner: decoded.userId })

		res.json(todoitem)
		console.log('sub_item ', todoitem)
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
}

exports.todoRemove = async function (req, res) {
	try {
		const { _id } = req.body
		await ToDoItem.findByIdAndRemove({ _id }, function (err) {
			if (err) return next(err)
			res.send('Deleted successfully!')
		})
	} catch (e) {
		console.log(e)
	}
}

exports.todoUpdate = async function (req, res) {
	try {
		await ToDoItem.findByIdAndUpdate(
			req.body._id,
			{ $set: req.body },
			function (err) {
				if (err) return next(err)
				res.send('ToDo udpated.')
			}
		)
	} catch (e) {}
}

exports.todoCompleteAll = async function (req, res) {
	try {
		const token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		await ToDoItem.updateMany(
			{ owner: decoded.userId },
			{ $set: { completed: true } },
			function (err) {
				if (err) return next(err)
				res.send('All ToDo`s Completed.')
			}
		)
	} catch (error) {}
}

exports.todoDeleteCompleted = async function (req, res) {
	try {
		const token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		await ToDoItem.deleteMany(
			{ owner: decoded.userId, completed: true },
			function (err) {
				if (err) return next(err)
				res.send('All ToDo`s Completed.')
			}
		)
	} catch (error) {}
}
