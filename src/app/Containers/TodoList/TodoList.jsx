import React, {useState, useEffect, useContext, useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';
import {actions, initialState, todoSlice, fetchTodoUpdate as fetchTodoUpdateAction,
     getToDoList as getToDoListAction, removeOneToDo as removeOneToDoAction} from './todoSlice';
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

import {AuthContext} from '../../context/AuthContext'
import {NavLink, useHistory} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {Loader} from '../../Components/loader/Loader'
//import getAllTodo from '../../../../src/api.js'



/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */



const TodoList = (props) => {
    //-------------------logout
    //const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        //history.push('/')
    }
    //-------------------logout


    const FILTER_MAP = {
        All: () => true,
        ToDo: todo => !todo.completed,
        Completed: todo => todo.completed
    };

    const {todos, remove, markAsCheck, clearCompleted, checkAll, getToDoList, fetchTodoUpdate,  removeOneToDo} = props
    const [state, setState] = useState({items: [], filter: 'All'})



    
    useEffect(() => {
        setState({...state, items: todos})
    }, [todos])

    //load todoitems from MONGO

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchItems = useCallback(async () => {
        getToDoList()
      }, [token, request])

      useEffect( () => {
        fetchItems()
      }, [fetchItems])

      if (loading) {
        return <Loader/>
      }
    //load todoitems from MONGO
    
    // const subCheck = (_id, completed) =>{
    //     fetchTodoUpdate({_id, completed, text})
        
    // }


    const btnClick = name => () => {        
        const todoList = state.items.filter(FILTER_MAP[name])//todos вместо state.items
        setState({items: todoList, filter: name,})  
        // fetchTodoUpdate()
        // console.log(fetchTodoUpdate, actions)
    };

    let kol= [];     
    function lostCountToDo (el){
        if (el.completed == true) {kol.push(el)} 
    }; 

    //console.log(actions)
    
    return (
        <React.Fragment>
            <div className="logout" onClick={logoutHandler}><a href="/">LogOut</a></div>

            <header className="App-header">        
                Your todo list
            </header>
            
            <div className="todo-list">
                <ToDoInput/>
                <hr/>
                <div className="list">                    
                 {/*state.items.map((todo) => {console.log(state)})*/}   
                {state.items.map((todo, index) => (
                        
                        
                        <TodoItem
                        id={todo._id}                        
                        index={index}
                        key={todo._id}
                        text={todo.text}                        
                        //onRemove={remove}
                        // markAsChecked={markAsCheck}
                        //onRemove={() => remove({id: todo._id, completed: todo.completed, text: todo.text}) }
                        // markAsChecked={() => markAsCheck({id: todo._id, completed: todo.completed})}
                        onRemove={ () => removeOneToDo({id: todo._id})}
                        markAsChecked= { () => fetchTodoUpdate({id: todo._id, completed: todo.completed, text: todo.text})}
                        todo={todo}
                        />
                ))}
                </div>
                {state.items.length != 0  &&
                <div className="footerSection" >
                    <ul className="footer">
                        <li
                            className="taskCount"
                            onClick={checkAll}
                        >                            
                            {state.items.map(el => lostCountToDo(el))}                            
                            {`${state.items.length - kol.length} `}
                            tasks left
                        </li>
                        <li>                       
                            {controlBadges.map((name) => (
                                <button className={  name === state.filter ? "active" :'' } onClick={btnClick(name)}>                                    
                                    <input type="radio" className="options" autoComplete="off"
                                    key={name}
                                    onClick={btnClick(name)}
                                    name={name}                                    
                                    />
                                    {name}
                                </button>))}                                
                        </li>
                        
                        <li
                            className="clearTasksButton"
                            onClick={clearCompleted}>
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
    fetchTodoUpdate: fetchTodoUpdateAction,
    getToDoList: getToDoListAction,
    removeOneToDo: removeOneToDoAction,
    clearCompleted: actions.clearCompleted,
    checkAll: actions.checkAll
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
// export default TodoList
