import React from 'react'
import { useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { decreaseProductSelectedAmount, increaseProductSelectedAmount, removeProductFromBasket } from '../../redux/action-creators/basket'
import RemoveBasketItem from '../../assests/remove.svg'

export const BasketItem = ({ type, item }) => {
	const dispatch = useDispatch()
	const handleRemoveProduct = () => dispatch(removeProductFromBasket(item.id, item.price))
	const handleIncreaseProductAmount = () => dispatch(increaseProductSelectedAmount(item.id, item.price))
	const handleDecreaseProductAmount = () => dispatch(decreaseProductSelectedAmount(item.id, item.price))

	const TableItem = () => {
		return (
			<tr>
				<td className='d-flex justify-content-between'>
					<img className='mr-2' height={50} src={item.image} alt='product icon' />
					<span className='m-3'>{item.name}</span>
					<Button variant='none' onClick={handleRemoveProduct}>
						<Image width='30px' src={RemoveBasketItem} alt='remove' />
					</Button>
				</td>
				<td className='text-center'>{item.price} грн</td>
				<td>
					<div className='d-flex justify-content-around align-items-center'>
						<Button onClick={handleDecreaseProductAmount} disabled={item.selectedAmount <= 1} variant='primary'>
							-
						</Button>
						<span>{item.selectedAmount}</span>
						<Button onClick={handleIncreaseProductAmount} disabled={item.selectedAmount > item.amount} variant='primary'>
							+
						</Button>
					</div>
				</td>
				<td className='text-center'>{item.totalPrice} грн</td>
			</tr>
		)
	}
	const ListItem = () => {
		return (
			<Row className='border-bottom my-2 py-2'>
				<Col xs={4}>
					<img width={100} height={100} src={item.image} alt='' />
				</Col>
				<Col>
					<Row className='d-flex flex-column'>
						<Col>
							<Row className='d-flex align-items-center'>
								<Col>{item.name}</Col>
								<Col className='d-flex justify-content-end'>
									<Button variant='none' onClick={handleRemoveProduct}>
										<Image width='20px' src={RemoveBasketItem} alt='remove' />
									</Button>
								</Col>
							</Row>
						</Col>
						<Col>
							<strong>{item.price}</strong> грн
						</Col>
						<Col>
							<Row className='d-flex justify-content-between align-items-center mt-3'>
								<Col xs={8} className='d-flex justify-content-between'>
									<Button onClick={handleDecreaseProductAmount} disabled={item.selectedAmount <= 1} variant='secondary'>
										-
									</Button>
									<span>{item.selectedAmount}</span>
									<Button onClick={handleIncreaseProductAmount} disabled={item.selectedAmount > item.amount} variant='secondary'>
										+
									</Button>
								</Col>
								<Col>
									итого: <strong>{item.totalPrice}</strong> грн
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		)
	}
	return type === 'card' ? <ListItem /> : <TableItem />
}
