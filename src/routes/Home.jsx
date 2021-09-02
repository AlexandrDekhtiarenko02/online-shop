import React from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { routes } from './index'
import { Header } from '../components/header/Header'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { CustomSlider } from '../components/UI/CustomSlider'

export const Home = () => {
	const { topSalesKnifes, topSalesSharpeners, loading } = useSelector(state => state.topSales)
	return (
		<Container>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row>
				<Col>
					<h2>Категории</h2>
					<hr />
				</Col>
			</Row>
			<Row>
				{routes.map(item => (
					<Col key={Math.random()} className='d-flex justify-content-center '>
						<Link className='text-decoration-none' to={{ pathname: item.route, state: { category: item.title } }}>
							<Card className='border-0'>
								<Card.Img height={130} variant='top' src={item.image} />
								<Card.Body className='text-center'>
									<Card.Title>{item.title}</Card.Title>
								</Card.Body>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			{!loading && (
				<Row className='d-flex flex-column align-items-center justify-content'>
					<Col xs={11} xl={12} className='mt-5 d-flex flex-column align-items-center'>
						<h2>Топ продаж "Ножи"</h2>
						<CustomSlider category='knifes' data={topSalesKnifes} />
					</Col>
					<Col xs={10} xl={12} className=' mt-5 d-flex flex-column align-items-center justify-content'>
						<h2>Топ продаж "Точилки"</h2>
						<CustomSlider category='sharpeners' data={topSalesSharpeners} />
					</Col>
				</Row>
			)}
		</Container>
	)
}
