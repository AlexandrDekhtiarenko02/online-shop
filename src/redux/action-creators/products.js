import axios from 'axios'
import { SERVER_URL } from '../../utils/auth'
import {
	LOAD_PRODUCTS,
	LOAD_PRODUCTS_SUCCESS,
	LOAD_PRODUCTS_ERROR,
	LOAD_SELECTED_PRODUCT,
	LOAD_SELECTED_PRODUCT_ERROR,
	LOAD_SELECTED_PRODUCT_SUCCESS,
	LOAD_RECOMMENDED_PRODUCTS,
	LOAD_RECOMMENDED_PRODUCTS_ERROR,
	LOAD_RECOMMENDED_PRODUCTS_SUCCESS,
	SET_SORTING_URL,
	SET_FILTER_URL,
} from '../types'
export const loadProducts = url => {
	return async dispatch => {
		try {
			dispatch({ type: LOAD_PRODUCTS })
			const fetchedProducts = await axios.get(url)
			dispatch({
				type: LOAD_PRODUCTS_SUCCESS,
				payload: fetchedProducts.data,
			})
		} catch (error) {
			dispatch({
				type: LOAD_PRODUCTS_ERROR,
				payload: error,
			})
		}
	}
}
export const loadSelectedProduct = url => {
	return async dispatch => {
		try {
			dispatch({ type: LOAD_SELECTED_PRODUCT })
			const product = await axios.get(`${SERVER_URL}/${url}`)
			dispatch({
				type: LOAD_SELECTED_PRODUCT_SUCCESS,
				payload: product.data,
			})
		} catch (error) {
			dispatch({
				type: LOAD_SELECTED_PRODUCT_ERROR,
				payload: error,
			})
		}
	}
}
export const loadRecommendedProducts = (category, id) => {
	return async dispatch => {
		try {
			dispatch({ type: LOAD_RECOMMENDED_PRODUCTS })
			const productBrand = await (await axios.get(`${SERVER_URL}/${category}/${id}`)).data.brand.value
			const recommendedProducts = await (await axios.get(`${SERVER_URL}/${category}?brand.value=${productBrand}`)).data
			dispatch({
				type: LOAD_RECOMMENDED_PRODUCTS_SUCCESS,
				payload: recommendedProducts,
			})
		} catch (error) {
			dispatch({
				type: LOAD_RECOMMENDED_PRODUCTS_ERROR,
				payload: error,
			})
		}
	}
}
export const setFilterUrl = url => {
	return dispatch => {
		dispatch({ type: SET_FILTER_URL, payload: url })
	}
}
export const setSortUrl = url => {
	return dispatch => {
		dispatch({ type: SET_SORTING_URL, payload: url })
	}
}
