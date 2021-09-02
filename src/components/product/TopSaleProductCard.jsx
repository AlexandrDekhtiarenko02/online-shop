import React from 'react'
import Card from 'react-bootstrap/Card'
import ReactStars from 'react-rating-stars-component'

export const TopSaleProductCard = ({ product }) => {
	const { image, name, price, rating } = product
	return (
		<Card>
			<Card.Img height={200} variant='top' src={image} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
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
			</Card.Body>
		</Card>
	)
}
