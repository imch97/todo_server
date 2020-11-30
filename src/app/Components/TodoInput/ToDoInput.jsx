import React from 'react'
import {
	actions,
	createToDo as createToDoAction,
} from '../../Containers/TodoList/todoSlice'
import { useState } from 'react'
import { connect } from 'react-redux'

const ToDoInput = (props) => {
	const { createToDo } = props

	const [value, setValue] = useState('')

	const pressHandler = async (event) => {
		if (event.key === 'Enter') {
			createToDo(value)
		}
	}

	return (
		// <form className="form">
		<input
			type="text"
			className="input"
			placeholder="Enter your task name here"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyPress={pressHandler}
		/>
		// </form>
	)
}

const mapDispatch = {
	createToDo: createToDoAction,
	addTodo: actions.addTodo,
}

export default connect(null, mapDispatch)(ToDoInput)
