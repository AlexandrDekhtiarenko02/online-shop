import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { BasketItem } from './BasketItem'
import { MakeOrderModal } from '../order/MakeOrderModal'

export const Basket = ({ show, handleClose }) => {
	const { products, totalPrice } = useSelector(state => state.basket)
	const [showMakeOrderModal, setShowMakeOrderModal] = useState(false)
	const handleHideModal = () => setShowMakeOrderModal(false)
	const handleOpenModal = () => {
		handleClose()
		setShowMakeOrderModal(true)
	}

	return (
		<>
			<Modal size='lg' centered show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Корзина</Modal.Title>
				</Modal.Header>
				<Modal.Body className='overflow-scroll' style={{ height: '400px' }}>
					{products.length > 0 ? (
						<>
							<div className='d-none d-lg-block'>
								<Table size='lg' striped bordered hover>
									<thead>
										<tr>
											<th className='text-center'>Название</th>
											<th className='text-center'>Цена</th>
											<th className='text-center'>Количество</th>
											<th className='text-center'>Итоговая цена</th>
										</tr>
									</thead>
									<tbody>
										{products.map(item => (
											<BasketItem key={Math.random()} item={item} />
										))}
									</tbody>
								</Table>
								<h5>
									Итого:&nbsp;
									<span className='font-weight-bold'>{totalPrice}</span>
									&nbsp;грн
								</h5>
							</div>
							<Row className='d-lg-none '>
								{products.map(item => (
									<Col key={Math.random()} xs={12}>
										<BasketItem item={item} type='card' />
									</Col>
								))}
							</Row>
						</>
					) : (
						<h5 className='text-center text-secondary'>Корзина пуста:( Но это не позно исправить:)</h5>
					)}
				</Modal.Body>
				<Modal.Footer>
					{products.length > 0 && (
						<Button variant='success' onClick={handleOpenModal}>
							Оформить заказ
						</Button>
					)}
				</Modal.Footer>
			</Modal>
			<MakeOrderModal order={{ products, totalPrice }} show={showMakeOrderModal} onHide={handleHideModal} />
		</>
	)
}
