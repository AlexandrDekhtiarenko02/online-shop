import axios from 'axios'
import { SERVER_URL } from '../../utils/auth'
import { LOAD_TOP_SALES_ERROR, LOAD_TOP_SALES_SUCCESS } from '../types'

export const loadTopSales = () => {
	const TOP_SALES_QUERY = '_sort=rating&_order=desc&_limit=5'
	return dispatch => {
		axios
			.all([axios.get(`${SERVER_URL}/knifes?${TOP_SALES_QUERY}`), axios.get(`${SERVER_URL}/sharpeners?${TOP_SALES_QUERY}`)])
			.then(
				axios.spread((topSalesKnifes, topSalesSharpeners) => {
					dispatch({
						type: LOAD_TOP_SALES_SUCCESS,
						payload: {
							topSalesKnifes: topSalesKnifes.data,
							topSalesSharpeners: topSalesSharpeners.data,
						},
					})
				})
			)
			.catch(error => {
				dispatch({
					type: LOAD_TOP_SALES_ERROR,
					payload: error,
				})
			})
	}
}
