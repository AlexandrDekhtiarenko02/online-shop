import React, { useState, useEffect } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Header } from '../components/header/Header'
import { loadRecommendedProducts, loadSelectedProduct } from '../redux/action-creators/products'
import { authCheck } from '../utils/auth'
import { AddComment } from '../components/comment/AddComment'
import { loadProductComments } from '../redux/action-creators/comments'
import { addProductToViewedList } from '../redux/action-creators/user'
import { CommentItem } from '../components/comment/CommentItem'
import { CustomSlider } from '../components/UI/CustomSlider'
import { scrollToTop } from '../utils/scroll'
import { getCharacteristics } from '../utils/product'
import '../sass/comments.scss'
export const Product = () => {
	const dispatch = useDispatch()
	const { viewedProducts } = useSelector(state => state.user)
	const { products } = useSelector(state => state.basket)
	const [showAddComment, setShowAddComment] = useState(false)
	const { category, id } = useParams()
	const { selectedProduct, recommendedProducts } = useSelector(state => state.products)
	const { comments } = useSelector(state => state.comments)

	const handleAddCommentClose = () => setShowAddComment(false)
	const handleAddCommentShow = () => setShowAddComment(true)

	useEffect(() => {
		dispatch(loadSelectedProduct(`${category}/${id}`))
		dispatch(loadProductComments(id))
		dispatch(loadRecommendedProducts(category, id))
		dispatch(addProductToViewedList(category, parseInt(id)))
		scrollToTop()
	}, [category, id, dispatch])
	return (
		<Container>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row className='d-flex justify-content-center'>
				<Col md={6}>
					<Row>
						<Col>
							<ReactImageMagnify
								isHintEnabled={true}
								enlargedImagePosition='over'
								hintTextMouse='Наведите мышь для увеличения'
								{...{
									smallImage: {
										alt: 'Product',
										src: selectedProduct.image,

										isFluidWidth: true,
									},
									largeImage: {
										src: selectedProduct.image,
										width: 1600,
										height: 1200,
									},
									lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
								}}
							/>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row>
						<Col>
							<h2>{selectedProduct.name}</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							{selectedProduct.amount > 0 ? (
								<span className='in-stock-text'>Есть в наличии</span>
							) : (
								<span className='not-available-text'>Нет в наличии</span>
							)}
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col>
							<h3>{selectedProduct.price} грн</h3>
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col>
							{products.some(el => el.id === selectedProduct.id) ? (
								<Button size='sm' disabled={selectedProduct.amount <= 0} variant='success'>
									В корзине
								</Button>
							) : (
								<Button size='sm' disabled={selectedProduct.amount <= 0} variant='outline-success'>
									В корзину
								</Button>
							)}
						</Col>
					</Row>
					<Row className='mt-4'>
						<Col xl={12}>
							<h3>Характеристики</h3>
						</Col>
						<Col>
							<ListGroup as='ul'>
								{getCharacteristics(selectedProduct).map(item => (
									<ListGroup.Item className='d-flex justify-content-between' as='li' key={Math.random()}>
										<span>{item[1].title}</span>
										<span>{item[1].value}</span>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 className='description-title'>Описание</h2>
					<hr />
					<p className='description'>{selectedProduct.description}</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 className='description-title'>Отзывы </h2>
					{authCheck() ? (
						<Button onClick={handleAddCommentShow} className='mt-4' variant='outline-info'>
							Оставить отзыв
						</Button>
					) : (
						<span className='text-danger'>Зарегистрируйте или войдите, чтобы добавить отзыв</span>
					)}
					<Row className='comments'>
						{comments.map(comment => (
							<CommentItem key={Math.random()} comment={comment} />
						))}
					</Row>
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col>
					<h4>Вам также могут понравится</h4>
					<CustomSlider category={category} data={recommendedProducts} />
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col>
					<h4>Просмотренные товары</h4>
					<CustomSlider category={category} data={viewedProducts} />
				</Col>
			</Row>
			<AddComment show={showAddComment} handleClose={handleAddCommentClose} productId={selectedProduct.id} />
		</Container>
	)
}
