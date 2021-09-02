import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ReactStars from 'react-rating-stars-component'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { addProductToBasket } from '../../redux/action-creators/basket'
import { addProductToWishList } from '../../redux/action-creators/user'
import { authCheck } from '../../utils/auth'
import { getCharacteristics } from '../../utils/product'

export const ProductCard = ({ product, showToWishButton }) => {
	const dispatch = useDispatch()
	const path = useLocation().pathname
	const { products } = useSelector(state => state.basket)
	const { id, image, name, price, amount, rating } = product

	const handleAddProductToWishList = () => dispatch(addProductToWishList(path, product.id))
	const handleAddProductToBasket = () => {
		const selectedAmount = 1
		dispatch(addProductToBasket({ id, name, image, amount, price, selectedAmount }))
	}

	return (
		<Card>
			<Card.Img src={image} />
			<Card.Body>
				<Link to={`${path}/${id}`}>
					<Card.Title>{name}</Card.Title>
				</Link>

				<Card.Title>{price} грн</Card.Title>
				<ReactStars
					edit={false}
					count={5}
					size={24}
					value={rating}
					emptyIcon={<i className='far fa-star'></i>}
					halfIcon={<i className='fa fa-star-half-alt'></i>}
					fullIcon={<i className='fa fa-star'></i>}
					activeColor='#ffd700'
				/>
				{amount > 0 ? (
					<Card.Text className='text-success'>Есть в наличии</Card.Text>
				) : (
					<Card.Text className='text-danger'>Нет в наличии</Card.Text>
				)}

				<Card.Text>
					{getCharacteristics(product).map(item => (
						<span key={Math.random()}>
							{item[1].title} - <strong>{item[1].value}.&nbsp;</strong>
						</span>
					))}
				</Card.Text>
			</Card.Body>
			<Row className='mb-3 align-items-center'>
				{amount > 0 ? (
					<Col className='d-flex justify-content-center'>
						{authCheck() ? (
							products.some(el => el.id === product.id) ? (
								<Button size='sm' disabled={product.amount <= 0} variant='success'>
									В корзине
								</Button>
							) : (
								<Button size='sm' disabled={product.amount <= 0} onClick={handleAddProductToBasket} variant='outline-success'>
									В корзину
								</Button>
							)
						) : (
							<p className='px-3 text-warning'>Войдите или зарегистрируйтесь для добавления в корзину</p>
						)}
					</Col>
				) : (
					''
				)}
				<Col className='d-flex justify-content-center'>
					{authCheck() && showToWishButton && (
						<Button size='sm' onClick={handleAddProductToWishList} variant='primary'>
							В желания
						</Button>
					)}
				</Col>
			</Row>
		</Card>
	)
}
