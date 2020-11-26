import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




import {useHttp} from '../../hooks/http.hook.js'
import {useMessage} from '../../hooks/message.hook.js'
import {AuthContext} from '../../context/AuthContext.js'
import {useContext, useState} from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';

const Auth = (() => {
  const getToken = () => {
    const data = JSON.parse(localStorage.getItem('userDataTODO'))
    
    return data.token;
  }
  return {
    getToken
  }
})()



export const fetchTodoUpdate = createAsyncThunk('todo/todoitem', async (todo) => {

const new_completed = !todo.completed;
const new_body = JSON.stringify({_id: todo.id, completed: new_completed});
const response = await fetch('/todoitem', 
{method: 'PUT', body:new_body,
 headers: {
   Authorization: `Bearer ${Auth.getToken()}`, 
   'Content-Type': 'application/json'}})
//console.log('TODO INDEX ----- ', todo)

window.M.toast({ html: 'Update ToDo`s' }) //todo set correct module name
//console.log({_id: todo.id, text: todo.text, completed: new_completed})
return {_id: todo.id, text: todo.text, completed: new_completed}
})


export const getToDoList = createAsyncThunk('todo/getList', async () => {

  const response = await fetch('/todoitem', 
  {method: 'GET', 
   headers: {
    Authorization: `Bearer ${Auth.getToken()}`, 
     'Content-Type': 'application/json'}})
  const data = await response.json()
  return data
})

export const removeOneToDo = createAsyncThunk('todo/deleteitem', async (todo) => {

  const new_completed = !todo.completed;
  const new_body = JSON.stringify({_id: todo.id,});
  const response = await fetch('/todoitem', 
  {method: 'DELETE', body:new_body,
   headers: {
     Authorization: `Bearer ${Auth.getToken()}`, 
     'Content-Type': 'application/json'}})
  //console.log('response ', response)
  
  window.M.toast({ html: 'Update ToDo`s' }) //todo set correct module name
  //console.log({_id: todo.id, text: todo.text, completed: new_completed})
  return {_id: todo.id, text: todo.text, completed: new_completed, index: todo.index}
  })
  



export const initialState = {
  tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};
let nextTodoId = 0



export const todoSlice = createSlice({
  name: 'todo',
  initialState:[{_id: 45, text:'ddd'}],
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
      
      const { id, completed, text } = action.payload 
      //console.log('id ', id, ' completed ', completed, ' text ', text)
      
           
      state.splice(state.findIndex(i => i.id === id), 1)
    },
    markAsCheck: (state, action) => {          
      const { id, completed} = action.payload      
      return state.map(todo => todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo)
    },
    clearCompleted: (state) => {
      return state.filter(todo => !todo.completed === true)
    },
    checkAll: (state) => {      
      //return state.map(todo => todo ? {...todo, completed: !todo.completed} : todo)
      return state.map(todo => todo ? {...todo, completed: true} : todo)
    },
  },
  extraReducers: {

    [getToDoList.fulfilled]: (state, action) => {
      return action.payload
},
    
    [fetchTodoUpdate.fulfilled]: (state, action) => {
      //console.log('STATE ', state)
      //console.log('ACTION ', action)
      //state.map(todo => console.log('todo.id  ',todo._id))

      return state.map(todo => todo._id === action.payload._id ? {...todo, completed: !todo.completed} : todo)
    },

    [removeOneToDo.fulfilled]: (state, action) => {
      //console.log('STATE ', state)
      //console.log('ACTION ', action)
      state.map(todo => console.log('todo.index  ',todo.index))
      
      return state.splice(state.findIndex(todo => todo.index=== action.payload.index), 1)
    },

  }
});


//--------------------------
/*
function fetchSecretSauce(dispatch) {
  setTimeout(()=> {
      console.log('aaa', dispatch)
  }, 400)
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.

// A thunk in this context is a function that can be dispatched to perform async
// activity and can dispatch actions and read state.
// This is an action creator that returns a thunk:
function makeASandwichWithSecretSauce(forPerson) {
  // We can invert control here by returning a function - the "thunk".
  // When this function is passed to `dispatch`, the thunk middleware will intercept it,
  // and call it with `dispatch` and `getState` as arguments.
  // This gives the thunk function the ability to run some logic, and still interact with the store.
  return function(dispatch) {
    fetchSecretSauce(dispatch)
  };
}

// Thunk middleware lets me dispatch thunk async actions
// as if they were actions!

*/
//----------------------------------


export const fetchTodoDelete = createAsyncThunk('/todoitem', async (_id) => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request,} = useHttp()
    
  const response = await request('/todoitem', 'DELETE', {_id}, {
    Authorization: `Bearer ${auth.token}`
  })
  message('ToDo DELETED!');
  
  
})

export const actions = todoSlice.actions;


export default todoSlice.reducer;
