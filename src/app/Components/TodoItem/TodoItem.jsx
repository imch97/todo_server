import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './TodoItem.scss'

const todoGetComplete = (todo) =>
	classnames({ taskText: true, completeTask: todo.completed })

const TodoItem = ({ todo, id, markAsChecked, onRemove }) => {
	return (
		<React.Fragment>
			<li className="todo" key={id}>
				<input
					type="checkbox"
					onClick={markAsChecked}
					checked={todo.completed}
					readOnly={true}
				/>

				<label
					className="checkbox"
					onClick={markAsChecked}
					checked={todo.completed}
				></label>

				<div className={todoGetComplete(todo)}>
					{todo.text}
					<div className="deleteTask" onClick={onRemove}>
						<img
							src="https://img.icons8.com/android/12/000000/trash.png"
							width="20px"
							height="20px"
							alt="delete"
						/>
					</div>
				</div>
			</li>
			<hr />
		</React.Fragment>
	)
}

TodoItem.propTypes = {
	text: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	markAsChecked: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
}

export default TodoItem
