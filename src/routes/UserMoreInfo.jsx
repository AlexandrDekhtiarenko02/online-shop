import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { Button, Container } from 'react-bootstrap'
import { Header } from '../components/header/Header'
import { ProductCard } from '../components/product/ProductCard'
import { OrderItem } from '../components/order/OrderItem'
import { Redirect } from 'react-router'
export const UserMoreInfo = () => {
	const { name, surname, email, orders, wishList, viewedProducts } = useSelector(state => state.user)
	const [isLogout, setIsLogout] = useState(false)
	const handleLogout = () => {
		setIsLogout(true)
		localStorage.removeItem('accessToken')
	}
	return (
		<Container>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row className='d-flex justify-content-between'>
				<Col xs={6}>
					<h4>
						{name} {surname}
					</h4>
				</Col>
				<Col xs={1}>
					<Button onClick={handleLogout} variant='outline-danger'>
						Выйти
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<span>{email}</span>
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col>
					<Tab.Container id='left-tabs-example' defaultActiveKey='myOrders'>
						<Row>
							<Col sm={12} md={4}>
								<Nav variant='pills' className='flex-column'>
									<Nav.Item>
										<Nav.Link eventKey='myOrders'>Мои заказы</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='myWishList'>Список желаний</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey='myViewedProducts'>Просмотреные товары</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col>
								<Tab.Content>
									<Tab.Pane eventKey='myOrders'>
										{orders.map(order => (
											<OrderItem key={Math.random()} order={order} />
										))}
									</Tab.Pane>
									<Tab.Pane eventKey='myWishList'>
										<Container>
											<Row>
												{wishList.map(product => (
													<Col key={Math.random()} className='m-2' xs={4}>
														<ProductCard hideToWishButton={true} product={product} />
													</Col>
												))}
											</Row>
										</Container>
									</Tab.Pane>
									<Tab.Pane eventKey='myViewedProducts'>
										<Row className='align-items-center'>
											{viewedProducts.map(product => (
												<Col key={Math.random()} xs={12} sm={12} md={6} lg={4}>
													<ProductCard showToWishButton={false} product={product} />
												</Col>
											))}
										</Row>
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
					{isLogout && <Redirect to='/' />}
				</Col>
			</Row>
		</Container>
	)
}
