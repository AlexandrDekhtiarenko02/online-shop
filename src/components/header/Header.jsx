import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import { Auth } from '../authification/Auth'
import { Basket } from '../basket/Basket'
import { authCheck } from '../../utils/auth'
import { Link } from 'react-router-dom'
import Logo from '../../assests/shopLogo.png'
import BasketIcon from '../../assests/basket.svg'
import UserIcon from '../../assests/user.svg'

export const Header = () => {
	const { id } = useSelector(state => state.user)
	const [show, setShow] = useState(false)
	const [authVisibility, setAuthVisibility] = useState(false)
	const { products } = useSelector(state => state.basket)
	const showAuth = () => setAuthVisibility(true)
	const closeAuth = () => setAuthVisibility(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	return (
		<>
			<Container className='p-0 pt-2 mb-3'>
				<Row className='d-flex align-items-center'>
					<Col className='d-none d-sm-block'>
						<Link to='/'>
							<img height={100} src={Logo} alt='logo' />
						</Link>
					</Col>
					<Col className='justify-content-between d-flex align-items-center justify-content-sm-end'>
						{authCheck() && (
							<Button variant='light' onClick={handleShow}>
								<Image height={20} src={BasketIcon} />
								<Badge>
									<span className='text-secondary'>{products.length}</span>
								</Badge>
							</Button>
						)}

						{authCheck() ? (
							<Link to={`/user/${id}/more`}>
								<img height={20} src={UserIcon} alt='user icon' />
							</Link>
						) : (
							<Button variant='outline-primary' onClick={showAuth}>
								Войти
							</Button>
						)}
					</Col>
				</Row>
			</Container>
			<Auth show={authVisibility} onHide={closeAuth} />
			<Basket show={show} handleClose={handleClose} />
		</>
	)
}
