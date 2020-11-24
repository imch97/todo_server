import { createSlice } from '@reduxjs/toolkit';
<<<<<<< HEAD
// import submitTodo from '../../../api/todo/api.js'
import submitTodo from '../../../api/todo/api.js'
// /home/user/work/js/todo_server/src/api/todo/api.js
=======
//import submitTodo from '../../../../src/api.js'
import submitTodo from '../../../api/todo/api'
>>>>>>> b8004b04c275763745f9cbfbc78c9a858056fd4c
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
        submitTodo(text);
        state.push({ id, text, completed: false })
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } }
      }
    },
    remove: (state, action, index) => {
      const { id, text } = action.payload      
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


export const actions = todoSlice.actions;


export default todoSlice.reducer;
