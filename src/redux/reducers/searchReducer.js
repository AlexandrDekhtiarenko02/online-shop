import { GET_SEARCH_DATA, GET_SEARCH_DATA_ERROR, GET_SEARCH_DATA_SUCCESS } from '../types'

const initialState = {
	searchResults: [],
	loading: false,
	error: null,
}

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SEARCH_DATA: {
			return {
				...state,
				loading: true,
			}
		}
		case GET_SEARCH_DATA_SUCCESS: {
			return {
				...state,
				loading: false,
				searchResults: action.payload,
			}
		}
		case GET_SEARCH_DATA_ERROR: {
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
