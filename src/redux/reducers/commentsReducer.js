import { ADD_PRODUCT_COMMENT, LOAD_PRODUCT_COMMENTS } from '../types'

const intialState = {
	comments: [],
}
export const commentsReducer = (state = intialState, action) => {
	switch (action.type) {
		case LOAD_PRODUCT_COMMENTS:
			return {
				comments: action.payload,
			}
		case ADD_PRODUCT_COMMENT:
			return {
				comments: [...state.comments, action.payload],
			}
		default:
			return state
	}
}
