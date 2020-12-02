import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import TodoList from './app/Containers/TodoList/TodoList'

import { Loader } from './app/Components/loader/Loader'
import { useRoutes } from './app/routes'
import { useAuth } from './app/hooks/auth.hook'
import { AuthContext } from './app/context/AuthContext'
import { AuthPage } from './app/pages/AuthPage.jsx'
import 'materialize-css'
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        //{todo place your todo header here }
        Your todo list
      </header>
      <section>
        <TodoList/>
      </section>
    </div>
  );
}
*/

function App() {
	const { token, login, logout, userId, ready } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader />
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
			}}
		>
			<Router to="/todoitems">
				{/*isAuthenticated && <TodoList />*/}
				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	)
}

export default App
