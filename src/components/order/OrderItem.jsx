import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export const OrderItem = ({ order }) => {
	return (
		<Container className='m-4 border-bottom '>
			{order.products.map(product => (
				<Row key={Math.random()} className='flex-column flex-lg-row justify-content-lg-center align-items-center'>
					<Col xs={1} className='d-none d-lg-block'>
						<img height={40} src={product.image} alt='product' />
					</Col>
					<Col xs={6} lg={3}>
						<span className='text-secondary'>{product.name}</span>
					</Col>
					<Col xs={6} lg={3}>
						<span className='text-secondary'>
							цена за 1 шт - <strong>{product.price} грн</strong>
						</span>
					</Col>
					<Col xs={6} lg={2}>
						<span className='text-secondary'>
							кол-во - <strong>{product.selectedAmount}</strong> шт
						</span>
					</Col>

					<Col xs={6} lg={3}>
						<span className='text-secondary'>
							общая цена - <strong>{product.totalPrice} грн</strong>
						</span>
					</Col>
					<Col className='d-lg-none'>
						<hr />
					</Col>
				</Row>
			))}
			<Row className='mt-3'>
				<Col className='text-end'>
					<span className='text-success'>
						дата заказа - <strong className='text-secondary'>{order.date}</strong>
					</span>
				</Col>
				<Col className='text-end'>
					<span className='text-success'>
						сумма заказа - <strong className='text-secondary'>{order.totalPrice}</strong> грн
					</span>
				</Col>
				<Col className='text-end'>
					<span className='text-success'>
						способ доставки - <strong className='text-secondary'>{order.deliveryMethod}</strong>
					</span>
				</Col>
			</Row>
		</Container>
	)
}
