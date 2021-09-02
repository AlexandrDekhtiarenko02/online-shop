import {
	LOAD_BASKET,
	ADD_PRODUCT_TO_BASKET,
	REMOVE_PRODUCT_FROM_BASKET,
	INCREASE_PRODUCT_SELECTED_AMOUNT,
	DECREASE_PRODUCT_SELECTED_AMOUNT,
	CLEAR_BASKET,
} from '../types'

const intialBasket = {
	products: [],
	totalPrice: 0,
}

export const basketReducer = (state = intialBasket, action) => {
	switch (action.type) {
		case LOAD_BASKET: {
			return {
				...state,
				products: action.payload.products,
				totalPrice: action.payload.totalPrice,
			}
		}
		case ADD_PRODUCT_TO_BASKET: {
			const { id, name, price, image, amount, selectedAmount, totalPrice } = action.payload
			const newProduct = {
				id,
				name,
				price,
				image,
				amount,
				selectedAmount,
				totalPrice,
			}
			const updatedBasket = {
				...state,
				products: [...state.products, { ...newProduct }],
				totalPrice: state.totalPrice + price,
			}
			return updatedBasket
		}
		case REMOVE_PRODUCT_FROM_BASKET: {
			const removedProduct = state.products.find(item => item.id === action.payload)
			return {
				...state,
				products: state.products.filter(item => item.id !== action.payload),
				totalPrice: state.totalPrice - removedProduct.price * removedProduct.selectedAmount,
			}
		}
		case INCREASE_PRODUCT_SELECTED_AMOUNT: {
			const newState = {
				...state,
				products: state.products.map(item =>
					item.id === action.payload.id
						? {
								...item,
								selectedAmount: item.selectedAmount + 1,
								totalPrice: item.totalPrice + item.price,
						  }
						: item
				),
				totalPrice: state.totalPrice + action.payload.price,
			}
			return newState
		}
		case DECREASE_PRODUCT_SELECTED_AMOUNT: {
			const newState = {
				...state,
				products: state.products.map(item =>
					item.id === action.payload.id
						? {
								...item,
								selectedAmount: item.selectedAmount - 1,
								totalPrice: item.totalPrice - item.price,
						  }
						: item
				),
				totalPrice: state.totalPrice - action.payload.price,
			}
			return newState
		}
		case CLEAR_BASKET: {
			return {
				...state,
				products: [],
				totalPrice: 0,
			}
		}
		default:
			return state
	}
}
