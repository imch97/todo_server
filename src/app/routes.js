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
				<Redirect to="/main" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/main" exact>
				<AuthPage />
			</Route>
			<Redirect to="/main" />
		</Switch>
	)
}
