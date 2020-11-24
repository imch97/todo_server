import React from 'react';
import PropTypes from 'prop-types';
//import checkbox from 'react-bootstrap/checkbox';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {actions, initialState, todoSlice} from "../../Containers/TodoList/todoSlice";
import {useState} from 'react';
import { connect } from 'react-redux'
import './TodoItem.scss';
import TodoList from "../../Containers/TodoList/TodoList";
import removeTodo from "../../Containers/TodoList/TodoList"

/**
 * todo implement here component which will show todo item
 * Component should contain checkbox text and trash icon for remove item
 *
 * This component should receive the following params
 * text -  name of task
 * id - id of task
 * checked - checked state of the task
 * onCheck - callback which should be called if the checkbox state was changed
 * onRemove - callback which should be called if the trash icon was called
 *
 * NOTE: need to pass task id into callbacks as param
 */

const TodoItem = ({todo, text, id, completed, markAsChecked, onRemove}) => {
    return (
        <React.Fragment>
            <li className="todo"
                key={id}
            >
                <div className = "checkbox1">  
            <input type="checkbox" onClick={markAsChecked} checked={todo.completed}/>

                <label className = "checkbox" onClick={markAsChecked} checked={todo.completed}></label>
                </div> 
                <div className="taskText" style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.text}
                    <div className="deleteTask" onClick={onRemove}>                        
                        <img src="https://img.icons8.com/android/12/000000/trash.png" width="20px" height="20px"/>
                    </div>
                </div>
            </li>
            <hr/>
        </React.Fragment>
    )
};

TodoItem.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    markAsChecked: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default TodoItem
