import axios from 'axios'
import { SERVER_URL } from '../../utils/auth'
import { getCurrentTime } from '../../utils/date'
import { ADD_PRODUCT_COMMENT, LOAD_PRODUCT_COMMENTS } from '../types'
export const loadProductComments = id => {
	return dispatch => {
		axios
			.get(`${SERVER_URL}/comments?productId=${id}`)
			.then(res => dispatch({ type: LOAD_PRODUCT_COMMENTS, payload: res.data }))
			.catch(error => console.log(error))
	}
}
export const addProductComment = (url, id, comment) => {
	return async dispatch => {
		try {
			const requestProductUrl = `${SERVER_URL}${url}`
			const requestComments = `${SERVER_URL}/comments/`
			const requestProductAllRatings = `${requestComments}?productId=${id}`
			const allUsersRatings = await axios.get(requestProductAllRatings)
			await axios.post(requestComments, {
				productId: id,
				time: getCurrentTime(),
				userName: comment.userName,
				userSurname: comment.userSurname,
				text: comment.text,
				advantages: comment.advantages,
				disavantages: comment.disavantages,
				rating: comment.rating,
			})

			if (allUsersRatings.data.length > 0) {
				const productRatingsSum = allUsersRatings.data.reduce((acc, item) => {
					return (acc += item.rating)
				}, 0)
				const ratingSum = productRatingsSum + comment.rating
				await axios.patch(requestProductUrl, {
					rating: Math.round(ratingSum / allUsersRatings.data.length),
				})
			} else {
				await axios.patch(requestProductUrl, {
					rating: comment.rating,
				})
			}
			dispatch({ type: ADD_PRODUCT_COMMENT, payload: comment })
		} catch (error) {
			console.log(error)
		}
	}
}
