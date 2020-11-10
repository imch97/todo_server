import React from 'react';
import {actions, initialState, todoSlice} from "../../Containers/TodoList/todoSlice";
import {useState, useEffect} from 'react';
import { connect } from 'react-redux'



const ToDoInput = ( props ) => {
    const [value, setValue] = useState("");
    // const newTodos = [...todos, { text: value, id: new Date().getTime(), isCompleted: false }];
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) {
            return ;
        }
        props.addTodo(value)
        setValue("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                placeholder="Enter your task name here"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
};

const mapDispatch = { addTodo: actions.addTodo }

export default connect(
    null,
    mapDispatch
)(ToDoInput)
