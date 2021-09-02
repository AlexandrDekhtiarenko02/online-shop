import {
	ADD_PRODUCT_TO_WISH_LIST,
	LOAD_USER,
	REMOVE_PRODUCT_FROM_WISH_LIST,
	ADD_PRODUCT_TO_VIEWED_PRODUCTS_LIST,
	MAKE_ORDER,
} from '../types'
const initialState = {
	id: null,
	name: null,
	surname: null,
	email: null,
	password: null,
	phone: null,
	wishList: [],
	orders: [],
	viewedProducts: [],
}
export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER:
			return { ...action.payload }
		case ADD_PRODUCT_TO_WISH_LIST: {
			return {
				...state,
				wishList: [...state.wishList, action.payload],
			}
		}
		case REMOVE_PRODUCT_FROM_WISH_LIST: {
			return {
				...state,
				wishList: state.wishList.filter(product => product.id !== action.payload),
			}
		}
		case ADD_PRODUCT_TO_VIEWED_PRODUCTS_LIST: {
			return {
				...state,
				viewedProducts: [...state.viewedProducts, action.payload],
			}
		}
		case MAKE_ORDER: {
			const { date, products, totalPrice, deliveryMethod } = action.payload
			return {
				...state,
				orders: [
					...state.orders,
					{
						date,
						products,
						totalPrice,
						deliveryMethod,
					},
				],
			}
		}
		default:
			return state
	}
}
