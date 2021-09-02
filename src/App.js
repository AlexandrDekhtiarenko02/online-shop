import React, { useEffect } from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useDispatch } from 'react-redux'
import { Home } from './routes/Home'
import { Product } from './routes/Product'
import { Content } from './routes/Content'
import { UserMoreInfo } from './routes/UserMoreInfo'
import { loadUser } from './redux/action-creators/user'
import { loadTopSales } from './redux/action-creators/topSales'
import { loadBasketData } from './redux/action-creators/basket'
import './sass/app.scss'
function App() {
	const customHistory = createBrowserHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUser())
		dispatch(loadBasketData())
		dispatch(loadTopSales())
	}, [dispatch])

	return (
		<Router history={customHistory}>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/:category/:id' exact>
					<Product />
				</Route>
				<Route path='/:category' exact>
					<Content />
				</Route>
				<Route path='/:user/:id/more' exact>
					<UserMoreInfo />
				</Route>
			</Switch>
		</Router>
	)
}
export default App
