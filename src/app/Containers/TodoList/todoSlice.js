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
	try {
		const response = await fetch('/api/todoitem', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		return data
	} catch (e) {
		return e
	}
})

export const createToDo = createAsyncThunk('todo/create', async (text) => {
	try {
		const response = await fetch('/api/todoitem', {
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
	} catch (e) {
		return e
	}
})
export const fetchTodoUpdate = createAsyncThunk(
	'todo/todoitem/update',
	async (todo) => {
		try {
			await fetch('/api/todoitem', {
				method: 'PUT',
				body: JSON.stringify({ _id: todo.id, completed: !todo.completed }),
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					'Content-Type': 'application/json',
				},
			})

			const mes = !todo.completed ? 'Выполнена ToDo' : 'Не выполнена ToDo'
			window.M.toast({ html: mes })
			return { _id: todo.id, text: todo.text, completed: !todo.completed }
		} catch (e) {
			return e
		}
	}
)

export const removeOneToDo = createAsyncThunk('todo/todoitem', async (todo) => {
	try {
		const response = await fetch('/api/todoitem', {
			method: 'DELETE',
			body: JSON.stringify({ _id: todo._id }),
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		/*
		if (response.status > 399) {
			return response
		}
		window.M.toast({ html: 'DELETE ToDo`s' })
		return {
			_id: todo.id,
			text: todo.text,
			completed: todo.completed,
			owner: todo.owner,
		}*/
		console.log('e', response)
		return response
	} catch (e) {
		console.log('1122', e)
		return e
	}
})

export const removeComplteted = createAsyncThunk(
	'todo/todoitem/all',
	async (todo) => {
		try {
			const new_body = JSON.stringify({ _id: todo.id })
			await fetch('/api/todoitem/all', {
				method: 'DELETE',
				body: new_body,
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					'Content-Type': 'application/json',
				},
			})

			window.M.toast({ html: 'DELETE Completed ToDo`s' })
			return { _id: todo.id, text: todo.text, completed: todo.completed }
		} catch (e) {
			console.log(e)
			return { _id: todo.id, text: todo.text, completed: todo.completed }
		}
	}
)

export const completeAllTodoUpdate = createAsyncThunk(
	'todo/todoitem/complete',
	async (todo) => {
		try {
			await fetch('/api/todoitem/all', {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					'Content-Type': 'application/json',
				},
			})

			window.M.toast({ html: 'Все ToDo`s Выполнены!' })

			return { _id: todo.id, text: todo.text, completed: !todo.completed }
		} catch (e) {
			return e
		}
	}
)

export const initialState = {
	tasks: [],
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState: [],
	reducers: {
		deleteTodo: (state, action) => {
			const { _id } = action.payload
			state.splice(
				state.findIndex((i) => i._id === _id),
				1
			)
		},
	},
	extraReducers: {
		[getToDoList.fulfilled]: (state, action) => {
			return action.payload.map((todo) => ({
				_id: todo._id,
				text: todo.text,
				completed: todo.completed,
				owner: todo.owner,
			}))
		},

		[fetchTodoUpdate.fulfilled]: (state, action) => {
			return state.map((todo) =>
				todo._id === action.payload._id
					? { ...todo, completed: !todo.completed }
					: todo
			)
		},

		[removeOneToDo.fulfilled]: (state, action) => {
			console.log(action)
			if (
				action.payload.status > 399 ||
				action.payload.message === 'Failed to fetch'
			) {
				state.push({
					_id: action.meta.arg._id,
					text: action.meta.arg.text,
					completed: action.meta.arg.completed,
					owner: action.meta.arg.owner,
				})

				return
			}
			return state.filter((todo) => todo._id !== action.payload._id)
		},

		[removeComplteted.fulfilled]: (state, action) => {
			return state.filter((todo) => !todo.completed === true)
		},

		[completeAllTodoUpdate.fulfilled]: (state, action) => {
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
