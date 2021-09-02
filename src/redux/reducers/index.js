import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { basketReducer } from './basketReducer'
import { commentsReducer } from './commentsReducer'
import { productsReducer } from './productsReducer'
import { searchReducer } from './searchReducer'
import { topSalesReducer } from './topSalesReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
	products: productsReducer,
	basket: basketReducer,
	comments: commentsReducer,
	user: userReducer,
	search: searchReducer,
	topSales: topSalesReducer,
	auth: authReducer,
})
