import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactStars from 'react-rating-stars-component'

export const CommentItem = ({ comment }) => {
	return (
		<Col xs={12}>
			<Row>
				<Col xs={10} className='p-3'>
					<h4>
						{comment.userName} {comment.userSurname}
					</h4>
					<ReactStars
						edit={false}
						count={5}
						size={24}
						value={comment.rating}
						isHalf={true}
						emptyIcon={<i className='far fa-star'></i>}
						halfIcon={<i className='fa fa-star-half-alt'></i>}
						fullIcon={<i className='fa fa-star'></i>}
						activeColor='#ffd700'
					/>
				</Col>
				<Col>
					<span>{comment.time}</span>
				</Col>
			</Row>
			<Row className='d-flex flex-column'>
				<Col>
					<h5>Описание</h5>
				</Col>
				<Col>
					<p>{comment.text}</p>
				</Col>
			</Row>
			<Row className='d-flex flex-column mt-3'>
				<Col>
					<h5>Преимущества</h5>
				</Col>
				<Col>
					<span>{comment.advantages}</span>
				</Col>
			</Row>
			<Row className='d-flex flex-column mt-3'>
				<Col>
					<h5>Недостатки</h5>
				</Col>
				<Col>
					<span>{comment.disavantages}</span>
				</Col>
			</Row>
			<hr />
		</Col>
	)
}
