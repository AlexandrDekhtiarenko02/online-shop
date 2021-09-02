import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Header } from '../components/header/Header'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { SearchBar } from '../components/UI/SearchBar'
import { Sorting } from '../components/sorting/Sorting'
import { Filter } from '../components/filter/Filter'
import { ProductList } from '../components/product/ProductList'
import FilterIcon from '../assests/filter.svg'

export const Content = () => {
	const { category } = useParams()
	const location = useLocation()
	const [showResponsiveFilter, setShowResponsiveFilter] = useState(false)
	const handleShowResponsiveFilter = () => setShowResponsiveFilter(false)

	return (
		<Container className='pb-5'>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row className='d-flex align-items-center justify-content-center'>
				<Col xs={12} sm={12} lg={6}>
					<SearchBar category={category} />
				</Col>
				<Col sm={12} lg={6} className='my-3 my-lg-0 d-lg-flex justify-content-end'>
					<Sorting category={category} />
				</Col>
			</Row>
			<Row className='d-flex align-items-center'>
				<Col xs={1} sm={1} className='d-md-none'>
					<button onClick={() => setShowResponsiveFilter(!showResponsiveFilter)}>
						<img height={25} src={FilterIcon} alt='filter' />
					</button>
				</Col>
				<Col>
					<h3 className='text-secondary'>{location.state.category}</h3>
				</Col>
			</Row>
			<Row>
				<Col xl={3} lg={3} md={4} className='d-none d-md-flex h-50'>
					<Filter category={category} />
				</Col>
				{showResponsiveFilter ? (
					<Col xl={3} className='d-flex d-lg-none pb-2 align-items-start'>
						<Filter category={category} />
						<div className='mt-5'>
							<button onClick={handleShowResponsiveFilter} className='close-custom-button'>
								X
							</button>
						</div>
					</Col>
				) : (
					<Col>
						<ProductList category={category} />
					</Col>
				)}
			</Row>
		</Container>
	)
}
