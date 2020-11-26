import { configureStore } from '@reduxjs/toolkit';
import todo from './Containers/TodoList/todoSlice'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export default configureStore({
  reducer: {
    todo
    // todo: //todo link here todo reducer from the slice

  },
  //middleware: applyMiddleware
});
