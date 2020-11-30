import React, { useState, useEffect, useContext, useCallback } from 'react'

import { connect } from 'react-redux'
import TodoItem from '../../Components/TodoItem/TodoItem'
import {
	fetchTodoUpdate as fetchTodoUpdateAction,
	getToDoList as getToDoListAction,
	removeOneToDo as removeOneToDoAction,
	removeComplteted as removeCompltetedAction,
	completeAllTodoUpdate as completeAllTodoUpdateAction,
} from './todoSlice'
import PropTypes from 'prop-types'

import ToDoInput from '../../Components/TodoInput/ToDoInput'

import './TodoList.scss'

import { controlBadges } from '../../constants/todo'

import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../Components/loader/Loader'
import classnames from 'classnames'

const TodoList = (props) => {
	//-------------------logout
	const history = useHistory()
	const auth = useContext(AuthContext)

	const logoutHandler = (event) => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}
	//-------------------logout

	const FILTER_MAP = {
		All: () => true,
		ToDo: (todo) => !todo.completed,
		Completed: (todo) => todo.completed,
	}

	const {
		todos,
		getToDoList,
		fetchTodoUpdate,
		removeOneToDo,
		removeComplteted,
		completeAllTodoUpdate,
	} = props
	const [state, setState] = useState({ items: todos, filter: 'All' })

	useEffect(() => {
		setState({ ...state, items: todos })
	}, [todos])

	//load todoitems from MONGO

	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

	const fetchItems = useCallback(async () => {
		getToDoList()
	}, [token, request])

	useEffect(() => {
		fetchItems()
	}, [fetchItems])

	if (loading) {
		return <Loader />
	}
	//load todoitems from MONGO

	const btnClick = (name) => () => {
		const todoList = todos.filter(FILTER_MAP[name])
		setState({ items: todoList, filter: name })
	}

	let kol = []
	function lostCountToDo(el) {
		if (el.completed === true) {
			kol.push(el)
		}
	}

	const btnClass = (name, state) =>
		classnames({ activeButton: name === state.filter })

	return (
		<React.Fragment>
			<div className={classnames('logout')} onClick={logoutHandler}>
				<a href="/">LogOut</a>
			</div>

			<header className={classnames('App-header')}>Your todo list</header>

			<div className={classnames('todo-list')}>
				<ToDoInput />
				{}
				<hr />
				<div className={classnames('list')}>
					{state.items.map((todo, index) => (
						<TodoItem
							id={Number(todo._id)}
							index={index}
							key={todo._id}
							text={todo.text}
							onRemove={() => removeOneToDo({ id: todo._id })}
							markAsChecked={() =>
								fetchTodoUpdate({
									id: todo._id,
									completed: todo.completed,
									text: todo.text,
								})
							}
							todo={todo}
						/>
					))}
				</div>
				{todos.length !== 0 && (
					<div className={classnames('footerSection')}>
						<ul className={'footer'}>
							<li
								className={classnames('taskCount')}
								onClick={completeAllTodoUpdate}
							>
								{todos.map((el) => lostCountToDo(el))}
								{`${todos.length - kol.length} `}
								tasks left
							</li>
							<li>
								{controlBadges.map((name, index) => (
									<button
										className={btnClass(name, state)}
										onClick={btnClick(name)}
										key={index}
									>
										<input
											type="radio"
											className={classnames('options')}
											autoComplete="off"
											key={index}
											onClick={btnClick(name)}
											name={name}
										/>
										{name}
									</button>
								))}
							</li>
							<li
								className={classnames('clearTasksButton')}
								key={'clearTasksButton'}
								onClick={removeComplteted}
							>
								Clear completed
							</li>
						</ul>
					</div>
				)}
			</div>
		</React.Fragment>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({ todos: state.todo })
const mapDispatchToProps = {
	completeAllTodoUpdate: completeAllTodoUpdateAction,
	removeComplteted: removeCompltetedAction,
	fetchTodoUpdate: fetchTodoUpdateAction,
	getToDoList: getToDoListAction,
	removeOneToDo: removeOneToDoAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
