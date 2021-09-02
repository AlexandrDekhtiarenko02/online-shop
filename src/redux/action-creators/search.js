import axios from 'axios'
import { SERVER_URL } from '../../utils/auth'
import { GET_SEARCH_DATA, GET_SEARCH_DATA_ERROR, GET_SEARCH_DATA_SUCCESS } from '../types'
export const getSearchData = (category, searchQuery) => {
	return async dispatch => {
		try {
			dispatch({ type: GET_SEARCH_DATA })
			const searchData = await axios.get(`${SERVER_URL}/${category}?q=${searchQuery}`)
			dispatch({
				type: GET_SEARCH_DATA_SUCCESS,
				payload: searchData.data,
			})
		} catch (error) {
			dispatch({
				type: GET_SEARCH_DATA_ERROR,
				payload: error,
			})
		}
	}
}
