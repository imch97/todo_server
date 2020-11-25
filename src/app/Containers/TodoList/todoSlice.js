import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import submitTodo from '../../../api/todo/api'

import {useHttp} from '../../hooks/http.hook.js'
import {useMessage} from '../../hooks/message.hook.jsx'
import {AuthContext} from '../../context/AuthContext.jsx'
import {useContext} from 'react';



//import todo_create_with_users from '../../../'
// /home/user/work/js/todo_server/src/app/Containers/TodoList/todoSlice.js
export const initialState = {
  tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};
let nextTodoId = 0



export const todoSlice = createSlice({
  name: 'todo',
  initialState:[],
  reducers: {
    addTodo: {
      reducer(state, action) {
        const { id, text } = action.payload

        //submitTodo(text);
        state.push({ id, text, completed: false })
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } }
      }
    },
    remove: (state, action, index) => {
      
      const { id, text } = action.payload 
      
      fetchTodoDelete(id);
           
      state.splice(state.findIndex(i => i.id === id), 1)
    },
    markAsCheck: (state, action) => {          
      const { id, completed} = action.payload      
      return state.map (todo => todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo)
    },
    clearCompleted: (state) => {
      return state.filter(todo => !todo.completed === true)
    },
    checkAll: (state) => {      
      //return state.map(todo => todo ? {...todo, completed: !todo.completed} : todo)
      return state.map(todo => todo ? {...todo, completed: true} : todo)
    }
  },
});

export const fetchTodoDelete = createAsyncThunk('/todoitem', async (_id) => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request,} = useHttp()
    
  const response = await request('/todoitem', 'DELETE', {_id}, {
    Authorization: `Bearer ${auth.token}`
  })
  message('ToDo DELETED!');
  
  
})

export const fetchTodoUpdate = createAsyncThunk('/todoitem', async (_id,completed) => {

  const auth = useContext(AuthContext)
  const message = useMessage()
  const {request,} = useHttp()
  const update_completed = !completed;
const response = await request('/todoitem', 'PUT', {_id, completed: update_completed}, {
  Authorization: `Bearer ${auth.token}`
})
message('ToDo Update!');


})

export const actions = todoSlice.actions;


export default todoSlice.reducer;
