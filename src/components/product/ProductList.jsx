import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { ProductCard } from './ProductCard'
import { loadProducts } from '../../redux/action-creators/products'
import { SERVER_URL } from '../../utils/auth'
import { Backdrop } from '../UI/Backdrop'
import '../../sass/general.scss'

export const ProductList = ({ category }) => {
	const dispatch = useDispatch()
	const { data, loading } = useSelector(state => state.products)
	const { sortingUrl, filterUrl } = useSelector(state => state.products)
	const [limit, setLimit] = useState(5)
	const handleLoadMore = () => setLimit(prev => prev + 10)

	useEffect(() => {
		dispatch(loadProducts(`${SERVER_URL}/${category}?_limit=${limit}&_sort=amount,rating&_order=desc,desc`))
	}, [dispatch, limit, category])

	useEffect(() => {
		if (sortingUrl) {
			dispatch(loadProducts(sortingUrl))
		}
	}, [dispatch, sortingUrl])

	useEffect(() => {
		if (filterUrl) {
			dispatch(loadProducts(filterUrl))
		}
	}, [dispatch, filterUrl])

	return (
		<Row className='d-flex justify-content-center mt-xs-1'>
			{loading ? (
				<Backdrop />
			) : (
				<>
					{data.map(product => (
						<Col xl={4} lg={5} md={7} sm={6} xs={8} className='mb-3 mt-3' key={Math.random()}>
							<ProductCard showToWishButton={true} product={product} />
						</Col>
					))}
					<Row>
						<Col className='d-flex justify-content-center'>
							<Button onClick={handleLoadMore}>Загрузить еще</Button>
						</Col>
					</Row>
				</>
			)}
		</Row>
	)
}
