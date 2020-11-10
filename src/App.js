import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";
import ToDoInput from "./app/Components/TodoInput/ToDoInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*todo place your todo header here */}
        Your todo list
      </header>
      <section>
        <TodoList/>
      </section>
    </div>
  );
}

export default App;
