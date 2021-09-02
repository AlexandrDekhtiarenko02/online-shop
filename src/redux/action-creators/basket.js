import axios from 'axios'
import { authCheck, AUTH_HEADER, DECODED_TOKEN, SERVER_URL } from '../../utils/auth'
import {
	LOAD_BASKET,
	ADD_PRODUCT_TO_BASKET,
	REMOVE_PRODUCT_FROM_BASKET,
	INCREASE_PRODUCT_SELECTED_AMOUNT,
	DECREASE_PRODUCT_SELECTED_AMOUNT,
	CLEAR_BASKET,
} from '../types'

export const loadBasketData = () => {
	return dispatch => {
		if (authCheck()) {
			axios
				.all([
					axios.get(`${SERVER_URL}/660/basket_users_products/?userId=${DECODED_TOKEN.sub}`, AUTH_HEADER),
					axios.get(`${SERVER_URL}/660/basket_users_info/?id=${DECODED_TOKEN.sub}`, AUTH_HEADER),
				])
				.then(
					axios.spread((products, basketInfo) => {
						dispatch({
							type: LOAD_BASKET,
							payload: {
								products: products.data,
								totalPrice: basketInfo.data[0]?.totalPrice || 0,
							},
						})
					})
				)
		}
	}
}
export const addProductToBasket = product => {
	const { id, name, price, image, amount, selectedAmount } = product
	return dispatch => {
		axios
			.all([
				axios.post(`${SERVER_URL}/basket_users_products/`, {
					userId: DECODED_TOKEN.sub,
					...product,
					totalPrice: product.price,
				}),
				axios.get(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`),
			])
			.then(
				axios.spread((_, res2) => {
					axios.patch(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`, {
						totalPrice: res2.data.totalPrice + price,
					})
				})
			)
			.catch(error => console.log(error))
		dispatch({
			type: ADD_PRODUCT_TO_BASKET,
			payload: {
				id,
				name,
				price,
				image,
				amount,
				selectedAmount,
				totalPrice: price,
			},
		})
	}
}
export const removeProductFromBasket = (id, price) => {
	return dispatch => {
		axios
			.all([axios.delete(`${SERVER_URL}/basket_users_products/${id}`), axios.get(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`)])
			.then(
				axios.spread((res1, res2) => {
					axios.patch(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`, {
						totalPrice: res2.data.totalPrice - price,
					})
				})
			)
			.then(() => {
				dispatch({
					type: REMOVE_PRODUCT_FROM_BASKET,
					payload: id,
				})
			})
	}
}
export const increaseProductSelectedAmount = (id, price) => {
	return async dispatch => {
		axios
			.all([axios.get(`${SERVER_URL}/basket_users_products/${id}`), axios.get(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`)])
			.then(
				axios.spread((res1, res2) => {
					axios
						.patch(`${SERVER_URL}/basket_users_products/${id}`, {
							selectedAmount: res1.data.selectedAmount + 1,
							totalPrice: res1.data.totalPrice + price,
						})
						.then(() => {
							axios.patch(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`, {
								totalPrice: res2.data.totalPrice + price,
							})
						})
				})
			)
			.then(() => {
				dispatch({
					type: INCREASE_PRODUCT_SELECTED_AMOUNT,
					payload: {
						id,
						price,
					},
				})
			})
	}
}
export const decreaseProductSelectedAmount = (id, price) => {
	return async dispatch => {
		axios
			.all([axios.get(`${SERVER_URL}/basket_users_products/${id}`), axios.get(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`)])
			.then(
				axios.spread((res1, res2) => {
					axios
						.patch(`${SERVER_URL}/basket_users_products/${id}`, {
							selectedAmount: res1.data.selectedAmount - 1,
							totalPrice: res1.data.totalPrice - price,
						})
						.then(() => {
							axios.patch(`${SERVER_URL}/basket_users_info/${DECODED_TOKEN.sub}`, {
								totalPrice: res2.data.totalPrice - price,
							})
						})
				})
			)
			.then(() => {
				dispatch({
					type: DECREASE_PRODUCT_SELECTED_AMOUNT,
					payload: {
						id,
						price,
					},
				})
			})
	}
}
export const clearBasket = userId => {
	return async dispatch => {
		try {
			const basketData = await axios.get(`${SERVER_URL}/basket_users_products`)
			await basketData.data
				.filter(item => item.userId === userId.toString())
				.forEach(item => axios.delete(`${SERVER_URL}/basket_users_products/${item.id}`))
			await axios.patch(`${SERVER_URL}/basket_users_info/${userId}`, {
				totalPrice: 0,
			})
			dispatch({ type: CLEAR_BASKET })
		} catch (error) {
			console.log(error)
		}
	}
}
