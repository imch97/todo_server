import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TodoList from './Containers/TodoList/TodoList'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/todoitems" exact>
					<TodoList />
				</Route>
				<Redirect to="/todoitems" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}
