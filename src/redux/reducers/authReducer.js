import { AUTH_USER_ERROR, AUTH_USER_SUCCESS } from '../types'

const initialState = {
	isAuth: false,
	error: null,
}
export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				isAuth: true,
			}
		}
		case AUTH_USER_ERROR: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		default: {
			return state
		}
	}
}
