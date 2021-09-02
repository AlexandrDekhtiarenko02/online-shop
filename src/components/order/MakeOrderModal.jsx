import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { clearBasket } from '../../redux/action-creators/basket'
import { getCurrentTime } from '../../utils/date'
import { makeOrder } from '../../redux/action-creators/user'

export const MakeOrderModal = props => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [deliveryMethod, setDeliveryMethod] = useState('Курьер HOT KNIFE')
	const handleDeliveryMethod = e => setDeliveryMethod(e.target.value)
	const handleMakeOrder = () => {
		dispatch(
			makeOrder({
				date: getCurrentTime(),
				products: props.order.products,
				totalPrice: props.order.totalPrice,
				deliveryMethod,
			})
		)
		dispatch(clearBasket(user.id))
		props.onHide()
	}

	return (
		<Modal {...props} size='lg' centered>
			<Modal.Header>
				<Modal.Title>Оформление заказа</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Ваш заказ</h4>
				<hr />
				{props.order.products.map(product => (
					<Row key={Math.random()} className='flex-column flex-lg-row align-items-center'>
						<Col className='d-none d-xl-block' xs={1}>
							<img height={40} src={product.image} alt='product' />
						</Col>
						<Col xs={12} lg={3}>
							<span className='text-secondary'>{product.name}</span>
						</Col>
						<Col xs={12} lg={2}>
							<span className='text-secondary'>
								<strong>{product.price}</strong>
								&nbsp;грн
							</span>
						</Col>
						<Col xs={12} lg={3}>
							<span className='text-secondary'>
								кол-во - <strong>{product.selectedAmount}</strong> шт
							</span>
						</Col>

						<Col xs={12} lg={3}>
							<span className='text-secondary'>
								всего - <strong>{product.totalPrice} грн</strong>
							</span>
						</Col>
						<Col className='d-lg-none'>
							<hr />
						</Col>
					</Row>
				))}
				<Row>
					<Col>
						<h5>Способ доставки</h5>
					</Col>
				</Row>
				<Row className='d-flex flex-column'>
					<Col className='d-flex align-items-center mt-3'>
						<label className='d-flex align-items-center'>
							<input checked={true} onClick={handleDeliveryMethod} value='Курьер HOT KNIFE' type='radio' name='delivery method' />
							&nbsp; Курьер HOT KNIFE - 59 грн
						</label>
					</Col>
					<Col className='d-flex align-items-center mt-3'>
						<label className='d-flex align-items-center'>
							<input onClick={handleDeliveryMethod} value='Самовывоз из Новой Почты' type='radio' name='delivery method' />
							&nbsp; Самовывоз из Новой Почты - 65 грн
						</label>
					</Col>
					<Col className='d-flex align-items-center mt-3'>
						<label className='d-flex align-items-center'>
							<input onClick={handleDeliveryMethod} value='Самовывоз из УКРПОШТА' type='radio' name='delivery method' />
							&nbsp; Самовывоз из УКРПОШТА - 24 грн
						</label>
					</Col>
				</Row>
				<hr />
				<div className='mt-5'>
					<h5>
						К оплате <strong>{props.order.totalPrice}</strong>
						&nbsp;грн
					</h5>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='success' onClick={handleMakeOrder}>
					Сделать заказ
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
