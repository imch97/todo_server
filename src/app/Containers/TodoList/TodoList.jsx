import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';
import {actions, initialState, todoSlice} from './todoSlice';
import PropTypes from 'prop-types'
import { createSelector } from '@reduxjs/toolkit'
/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
import ToDoInput from "../../Components/TodoInput/ToDoInput";
import {bindActionCreators} from "../../utils/store";

import './TodoList.scss'
import RadioBadge from "../../Components/RadioBadge/RaidoBadge";

/**
 * todo use this list of the control badges to show them at the control panel
 */

import { controlBadges } from '../../constants/todo';
import {text} from "@fortawesome/fontawesome-svg-core";

//import getAllTodo from '../../../../src/api.js'

/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */


const TodoList = (props) => {
    const FILTER_MAP = {
        All: () => true,
        ToDo: todo => !todo.completed,
        Completed: todo => todo.completed
    };

    const {todos, remove, markAsCheck, clearCompleted, checkAll} = props
    const [state, setState] = useState({items: todos, filter: 'All'})

    useEffect(()  => {
        const todoList = todos.filter(FILTER_MAP['All'])
        setState({items: todoList, filter: 'All'})
        
    },[todos])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    
    


    const btnClick = name => () => {        
        const todoList = todos.filter(FILTER_MAP[name])
        setState({items: todoList, filter: name,})  
    };

    let kol= [];     
    function lostCountToDo (el){
        if (el.completed == true) {kol.push(el)} 
    }; 

    
    return (
        <React.Fragment>
            <div className="todo-list">
                <ToDoInput/>
                <hr/>
                <div className="list">                    
                {/*getAllTodo.map((todo, index) => {console.log('todo', todo); console.log('index', index)})*/}    
                    {state.items.map((todo, index) => (
                        
                        <TodoItem
                        id={todo.id}
                        index={index}
                        key={todo.id}
                        text={todo.text}
                        //onRemove={remove}
                        onRemove={() => remove({id: todo.id, text: todo.text}) }
                        markAsChecked={() => markAsCheck({id: todo.id, completed: todo.completed})}
                        // markAsChecked={markAsCheck}
                        todo={todo}
                        />
                        ))}
                </div>
                {todos.length != 0  &&
                <div className="footerSection" >
                    <ul className="footer">
                        <li
                            className="taskCount"
                            onClick={checkAll}
                        >                            
                            {todos.map(el => lostCountToDo(el))}                            
                            {`${todos.length - kol.length} `}
                            tasks left
                        </li>
                        <li>
                        {/* <div className="btn-group btn-group-toggle" data-toggle="buttons"> */}
                            {controlBadges.map((name) => (
                                <button className={  name === state.filter ? "active" :'' } onClick={btnClick(name)}>                                    
                                <input type="radio" className="options" autoComplete="off"
                                    key={name}
                                    onClick={btnClick(name)}
                                    name={name}                                    
                                    />
                                    {name}
                                    </button>))}
                                {/* </div> */}
                        </li>
                        
                        <li
                            className="clearTasksButton"
                            onClick={clearCompleted}
                        >
                            Clear completed
                        </li>
                    </ul>
                </div>
}  
            </div>
        </React.Fragment>
    )
}



const selectTodos = state => state.todos

const selectVisibleTodos = createSelector(
    [selectTodos]
)

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({todos: state.todo})
const mapDispatchToProps = {
    addTodo: actions.addTodo,
    remove: actions.remove,
    markAsCheck: actions.markAsCheck,
    //remove: (todo) => actions.remove({id: todo.id, text: todo.text}),
    // markAsCheck: (todo) => actions.markAsCheck({id: todo.id, completed: todo.completed}),

    clearCompleted: actions.clearCompleted,
    checkAll: actions.checkAll
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
// export default TodoList
