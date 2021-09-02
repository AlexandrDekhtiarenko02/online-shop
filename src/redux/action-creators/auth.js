import axios from 'axios'
import { SERVER_URL } from '../../utils/auth'
import { AUTH_USER_ERROR, AUTH_USER_SUCCESS } from '../types'

export const loginUser = (email, password) => {
	return async dispatch => {
		try {
			const accessTokenResponse = await axios.post(`${SERVER_URL}/login`, { email, password })
			await localStorage.setItem('accessToken', accessTokenResponse.data.accessToken)
			dispatch({ type: AUTH_USER_SUCCESS })
		} catch (error) {
			dispatch({ type: AUTH_USER_ERROR, payload: error })
		}
	}
}
export const registerUser = user => {
	return async dispatch => {
		try {
			await axios.all([axios.post(`${SERVER_URL}/register`, user), axios.post(`${SERVER_URL}/basket_users_info`, { totalPrice: 0 })])
			dispatch({ type: AUTH_USER_SUCCESS })
		} catch (error) {
			dispatch({ type: AUTH_USER_ERROR, payload: error })
		}
	}
}
