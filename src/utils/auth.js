import jwtDecode from 'jwt-decode'
export const SERVER_URL = 'http://localhost:3000'
export const ACCESS_TOKEN = localStorage.getItem('accessToken')
export const AUTH_HEADER = {
	headers: {
		Authorization: `Bearer ${ACCESS_TOKEN}`,
	},
}
export const authCheck = () => (localStorage.getItem('accessToken') ? true : false)
export const DECODED_TOKEN = authCheck() ? jwtDecode(ACCESS_TOKEN) : null
