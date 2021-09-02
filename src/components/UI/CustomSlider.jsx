import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { settings } from '../../utils/slider'
import { TopSaleProductCard } from '../product/TopSaleProductCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from 'react-slick'
import Next from '../../assests/right-arrow.svg'
import Prev from '../../assests/left-arrow.svg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const CustomSlider = ({ category, data }) => {
	const slider = useRef()
	const next = () => slider.current.slickNext()
	const prev = () => slider.current.slickPrev()

	return (
		<Container>
			<Row className='d-flex justify-content-center align-items-center mt-4'>
				<Col xs={1} className='d-none d-xl-flex'>
					<button className='prev' onClick={prev}>
						<img height={30} src={Prev} alt='previous arrow' />
					</button>
				</Col>
				<Col xs={12} xl={10}>
					<Slider ref={c => (slider.current = c)} {...settings}>
						{data.map(item => (
							<Link key={Math.random()} className='text-decoration-none' to={`/${category}/${item.id}`}>
								<TopSaleProductCard key={Math.random()} product={item} />
							</Link>
						))}
					</Slider>
				</Col>
				<Col className='d-flex d-xl-none justify-content-center mt-4'>
					<button className='prev' onClick={prev}>
						<img height={30} src={Prev} alt='previous arrow' />
					</button>
					<button className='next' onClick={next}>
						<img height={30} src={Next} alt='next arrow' />
					</button>
				</Col>
				<Col xs={1} className='d-none d-xl-flex'>
					<button className='next' onClick={next}>
						<img height={30} src={Next} alt='next arrow' />
					</button>
				</Col>
			</Row>
		</Container>
	)
}
