import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const Auth = (() => {
	const getToken = () => {
		const data = JSON.parse(localStorage.getItem('userDataTODO'))

		return data.token
	}
	return {
		getToken,
	}
})()

export const getToDoList = createAsyncThunk('todo/getList', async () => {
	const response = await fetch('/todoitem', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${Auth.getToken()}`,
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()
	return data
})

export const createToDo = createAsyncThunk('todo/create', async (text) => {
	const response = await fetch('/todoitem', {
		method: 'POST',
		body: JSON.stringify({ text }),
		headers: {
			Authorization: `Bearer ${Auth.getToken()}`,
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	return {
		_id: data._id,
		text: data.text,
		completed: false,
		owner: data.owner,
	}
})
export const fetchTodoUpdate = createAsyncThunk(
	'todo/todoitem/update',
	async (todo) => {
		const new_completed = !todo.completed
		const new_body = JSON.stringify({ _id: todo.id, completed: new_completed })
		await fetch('/todoitem', {
			method: 'PUT',
			body: new_body,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				'Content-Type': 'application/json',
			},
		})

		const mes = new_completed ? 'Выполнена ToDo' : 'Не выполнена ToDo'
		window.M.toast({ html: mes })
		return { _id: todo.id, text: todo.text, completed: new_completed }
	}
)

export const removeOneToDo = createAsyncThunk('todo/todoitem', async (todo) => {
	const new_body = JSON.stringify({ _id: todo.id })
	await fetch('/todoitem', {
		method: 'DELETE',
		body: new_body,
		headers: {
			Authorization: `Bearer ${Auth.getToken()}`,
			'Content-Type': 'application/json',
		},
	})

	window.M.toast({ html: 'DELETE ToDo`s' })
	return { _id: todo.id, text: todo.text, completed: todo.completed }
})

export const removeComplteted = createAsyncThunk(
	'todo/todoitem/all',
	async (todo) => {
		const new_body = JSON.stringify({ _id: todo.id })
		await fetch('/todoitem/all', {
			method: 'DELETE',
			body: new_body,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				'Content-Type': 'application/json',
			},
		})

		window.M.toast({ html: 'DELETE Completed ToDo`s' })
		return { _id: todo.id, text: todo.text, completed: todo.completed }
	}
)

export const completeAllTodoUpdate = createAsyncThunk(
	'todo/todoitem/complete',
	async (todo) => {
		await fetch('/todoitem/all', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				'Content-Type': 'application/json',
			},
		})

		window.M.toast({ html: 'Все ToDo`s Выполнены!' })

		return { _id: todo.id, text: todo.text, completed: !todo.completed }
	}
)

export const initialState = {
	tasks: [getToDoList()], // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getToDoList.fulfilled]: (state, action) => {
			return action.payload
		},

		[fetchTodoUpdate.fulfilled]: (state, action) => {
			console.log('fetchTodoUpdate')
			return state.map((todo) =>
				todo._id === action.payload._id
					? { ...todo, completed: !todo.completed }
					: todo
			)
		},

		[removeOneToDo.fulfilled]: (state, action) => {
			console.log('removeOneToDo')
			return state.filter((todo) => todo._id !== action.payload._id)
		},

		[removeComplteted.fulfilled]: (state, action) => {
			console.log('removeComplteted')
			return state.filter((todo) => !todo.completed === true)
		},

		[completeAllTodoUpdate.fulfilled]: (state, action) => {
			console.log('CompleteAllTodoUpdate')
			return state.map((todo) => (todo ? { ...todo, completed: true } : todo))
		},
		[createToDo.fulfilled]: (state, action) => {
			state.push({
				_id: action.payload._id,
				text: action.payload.text,
				completed: false,
				owner: action.payload.owner,
			})
		},
	},
})

export const actions = todoSlice.actions

export default todoSlice.reducer
