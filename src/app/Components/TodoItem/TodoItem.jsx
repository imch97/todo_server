import React from 'react'
import PropTypes from 'prop-types'

//import './TodoItem.scss'
import styled from 'styled-components'

const StyleToDo = styled.li`
	background: #fff;
	box-shadow: 1px 1x 1px rgba(0, 0, 0, 0.15);
	padding-right: 10px;
	font-size: 12px;
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	//margin: 3px;
`
const StyleHr = styled.hr`
	border: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const StyleDeleteTask = styled.div`
	float: right;
	size: 50px;
`
const StyleLable = styled.label`
	[type='checkbox']:not(:checked) + &:before,
	[type='checkbox']:checked + &:before {
		content: '';
		display: block;
		position: absolute;
		width: 20px;
		height: 20px;
		border: 1px solid #aaa;
		margin-left: 3px;
		border-radius: 50%;
	}

	[type='checkbox']:not(:checked) + &:after,
	[type='checkbox']:checked + &:after {
		content: '✔';
		display: inline-flex;
		margin-left: 5px;
		//margin-bottom: 8px;
		font-size: 20px;
		color: #09ad7e;
		transition: all 0.2s;
		position: relative;
		bottom: 4px;
	}

	[type='checkbox']:not(:checked) + &:after {
		opacity: 0;
		transform: scale(0);
	}
	[type='checkbox']:not(:checked) + &,
	[type='checkbox']:checked + & {
		position: relative;
		padding-top: 10px;
		cursor: pointer;
	}
`
const StyleInput = styled.input.attrs((props) => ({
	type: props.type,
}))`
	:not(:checked),
	:checked {
		position: absolute;
		left: -9999px;
	}
`
const StyleTaskText = styled.div.attrs((props) => ({}))`
	font-size: 20px;
	width: 100vh;
	margin-left: 1vh;
	text-align: justify;
	text-decoration: ${(props) => (props.sendTodo ? 'line-through' : 'none')};
`

const TodoItem = ({ todo, markAsChecked, onRemove, hide }) => {
	const handleClick = (e) => {
		onRemove(e)
		hide(e)
	}
	return (
		<React.Fragment>
			<StyleToDo key={todo._id}>
				<StyleInput
					type="checkbox"
					onClick={markAsChecked}
					checked={todo.completed}
					readOnly={true}
				/>

				<StyleLable
					className="checkbox"
					onClick={markAsChecked}
					checked={todo.completed}
				></StyleLable>

				<StyleTaskText
					sendTodo={todo.completed}
					//sstyle={{ textDecoration: 'line-through' }}
				>
					{todo.text}
					<StyleDeleteTask onClick={handleClick}>
						<img
							src="https://img.icons8.com/android/12/000000/trash.png"
							width="20px"
							height="20px"
							alt="delete"
						/>
					</StyleDeleteTask>
				</StyleTaskText>
			</StyleToDo>
			<StyleHr />
		</React.Fragment>
	)
}

TodoItem.propTypes = {
	markAsChecked: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	hide: PropTypes.func.isRequired,
}

export default TodoItem
