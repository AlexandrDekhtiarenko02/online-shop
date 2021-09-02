import axios from 'axios'
import { DECODED_TOKEN, SERVER_URL } from '../../utils/auth'
import { LOAD_USER, ADD_PRODUCT_TO_WISH_LIST, ADD_PRODUCT_TO_VIEWED_PRODUCTS_LIST, MAKE_ORDER } from '../types'

export const loadUser = () => {
	return async dispatch => {
		try {
			const user = await axios.get(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`)
			dispatch({
				type: LOAD_USER,
				payload: {
					...user.data,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const addProductToWishList = (category, productId) => {
	return async dispatch => {
		try {
			const userData = await axios.get(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`)
			const product = await axios.get(`${SERVER_URL}${category}/${productId}`)
			axios.patch(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`, {
				wishList: [...userData.data.wishList, product.data],
			})
			dispatch({
				type: ADD_PRODUCT_TO_WISH_LIST,
				payload: product.data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const addProductToViewedList = (category, productId) => {
	return async dispatch => {
		try {
			const MAX_AMOUNT_VIEWED_ITEMS = 14
			const userData = await axios.get(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`)
			const product = await axios.get(`${SERVER_URL}/${category}/${productId}`)
			if (!userData.data.viewedProducts.some(el => el.id === productId)) {
				if (userData.data.viewedProducts.length < MAX_AMOUNT_VIEWED_ITEMS) {
					await axios.patch(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`, {
						viewedProducts: [...userData.data.viewedProducts, product.data],
					})
				} else {
					const shiftedViewedProductsData = userData.data.viewedProducts
					shiftedViewedProductsData.shift()
					await axios.patch(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`, {
						viewedProducts: [...shiftedViewedProductsData, product.data],
					})
				}
				dispatch({
					type: ADD_PRODUCT_TO_VIEWED_PRODUCTS_LIST,
					payload: product.data,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
export const makeOrder = order => {
	return async dispatch => {
		try {
			const userData = await axios.get(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`)
			await axios.patch(`${SERVER_URL}/users/${DECODED_TOKEN.sub}`, {
				orders: [...userData.data.orders, order],
			})
			dispatch({ type: MAKE_ORDER, payload: order })
		} catch (error) {
			console.log(error)
		}
	}
}
