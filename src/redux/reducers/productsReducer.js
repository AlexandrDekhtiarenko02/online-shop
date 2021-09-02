import * as types from '../types'

const initialState = {
	data: [],
	selectedProduct: {},
	recommendedProducts: [],
	filterUrl: '',
	sortingUrl: '',
	loading: false,
	loadingSelectedProduct: false,
	loadingRecommendedProducts: false,
	error: null,
}

export const productsReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case types.LOAD_PRODUCTS:
			return {
				...state,
				loading: true,
			}
		case types.LOAD_PRODUCTS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: payload,
			}
		}
		case types.LOAD_PRODUCTS_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			}
		}
		case types.LOAD_SELECTED_PRODUCT: {
			return {
				...state,
				loadingSelectedProduct: true,
			}
		}
		case types.LOAD_SELECTED_PRODUCT_SUCCESS: {
			return {
				...state,
				selectedProduct: payload,
				loadingSelectedProduct: false,
			}
		}
		case types.LOAD_SELECTED_PRODUCT_ERROR: {
			return {
				...state,
				loadingSelectedProduct: false,
				error: payload,
			}
		}
		case types.SET_FILTER_URL: {
			return {
				...state,
				filterUrl: payload,
			}
		}
		case types.SET_SORTING_URL: {
			return {
				...state,
				sortingUrl: payload,
			}
		}
		case types.LOAD_RECOMMENDED_PRODUCTS: {
			return {
				...state,
				loadingRecommendedProducts: true,
			}
		}
		case types.LOAD_RECOMMENDED_PRODUCTS_SUCCESS: {
			return {
				...state,
				loadingRecommendedProducts: false,
				recommendedProducts: payload,
			}
		}
		case types.LOAD_RECOMMENDED_PRODUCTS_ERROR: {
			return {
				...state,
				loadingRecommendedProducts: false,
				error: payload,
			}
		}
		default:
			return state
	}
}
