import React from 'react'
import { SERVER_URL } from '../../utils/auth'
import { useDispatch } from 'react-redux'
import { setSortUrl } from '../../redux/action-creators/products'
import Form from 'react-bootstrap/Form'
export const Sorting = ({ category }) => {
	const dispatch = useDispatch()
	const sort = event => {
		const { condition, direction } = JSON.parse(event.target.value)
		dispatch(setSortUrl(`${SERVER_URL}/${category}?_sort=${condition}&_order=${direction}`))
	}

	return (
		<Form.Control as='select' size='md' onChange={sort}>
			<option value={JSON.stringify({ condition: 'name', direction: 'asc' })}>Сортировать по названию</option>
			<option value={JSON.stringify({ condition: 'rating', direction: 'desc' })}>Сортировать по рейтингу</option>
			<option value={JSON.stringify({ condition: 'price', direction: 'asc' })}>Сначала дешевые</option>
			<option value={JSON.stringify({ condition: 'price', direction: 'desc' })}>Сначала дорогие</option>
		</Form.Control>
	)
}
