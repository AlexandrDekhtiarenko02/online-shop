import { LOAD_TOP_SALES, LOAD_TOP_SALES_ERROR, LOAD_TOP_SALES_SUCCESS } from '../types'

const initialState = {
	topSalesKnifes: [],
	topSalesSharpeners: [],
	loading: false,
	error: null,
}
export const topSalesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TOP_SALES: {
			return {
				...state,
				loading: true,
			}
		}
		case LOAD_TOP_SALES_SUCCESS: {
			return {
				...state,
				loading: false,
				topSalesKnifes: action.payload.topSalesKnifes,
				topSalesSharpeners: action.payload.topSalesSharpeners,
			}
		}
		case LOAD_TOP_SALES_ERROR: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		default:
			return state
	}
}
