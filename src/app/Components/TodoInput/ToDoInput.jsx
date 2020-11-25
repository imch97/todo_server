import React from 'react';
import {actions, initialState, todoSlice} from "../../Containers/TodoList/todoSlice";
import {useState, useEffect, useContext} from 'react';
import { connect } from 'react-redux'

import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from '../../context/AuthContext'




const ToDoInput = ( props ) => {


    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request,} = useHttp()
  
    



    const [value, setValue] = useState("");    
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) {
            return ;
        }
        props.addTodo(value)
        setValue("");
    };

    const pressHandler = async event => {
        if (event.key === 'Enter') {
          try {
            const data = await request('/todoitem', 'POST', {text: value, token: auth.token}, {
              Authorization: `Bearer ${auth.token}`
            })
            message('ToDo добавлена!')
          } catch (e) {}
        }
      }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                placeholder="Enter your task name here"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyPress = {pressHandler}
            />
        </form>
    );
};

const mapDispatch = { addTodo: actions.addTodo }

export default connect(
    null,
    mapDispatch
)(ToDoInput)
