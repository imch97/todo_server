import { configureStore } from '@reduxjs/toolkit';
import todo from './Containers/TodoList/todoSlice'

export default configureStore({
  reducer: {
    todo
    // todo: //todo link here todo reducer from the slice

  },
});
