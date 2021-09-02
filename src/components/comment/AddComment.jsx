import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { addProductComment } from '../../redux/action-creators/comments'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useInput } from '../../hooks/useInput'
export const AddComment = ({ show, handleClose, productId }) => {
	const dispatch = useDispatch()
	const path = useLocation().pathname
	const user = useSelector(state => state.user)
	const [rating, setRating] = useState(0)
	const commentText = useInput('', { isEmpty: true })
	const commentAdvantageText = useInput('', { isEmpty: true })
	const commentDisavantageText = useInput('', { isEmpty: true })

	const ratingChanged = newRating => setRating(newRating)
	const handleAddComment = () =>
		dispatch(
			addProductComment(path, productId, {
				userName: user.name,
				userSurname: user.surname,
				text: commentText,
				advantages: commentAdvantageText,
				disavantages: commentDisavantageText,
				rating,
			})
		)

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header>
				<Modal.Title>Оставить отзыв</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Control
							value={commentText.value}
							onChange={commentText.onChange}
							onBlur={commentText.onBlur}
							type='text'
							placeholder='Введите отзыв'
							maxLength={100}
						/>
						{commentText.isDirty && commentText.isEmptyError && <Form.Text className='text-danger'>{commentText.errorMessage}</Form.Text>}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							value={commentAdvantageText.value}
							onChange={commentAdvantageText.onChange}
							onBlur={commentAdvantageText.onBlur}
							type='text'
							placeholder='Введите преемущества'
							maxLength={100}
						/>
						{commentAdvantageText.isDirty && commentAdvantageText.isEmptyError && (
							<Form.Text className='text-danger'>{commentAdvantageText.errorMessage}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							value={commentDisavantageText.value}
							onChange={commentDisavantageText.onChange}
							onBlur={commentDisavantageText.onBlur}
							type='text'
							placeholder='Введите недостатки'
							maxLength={100}
						/>
						{commentDisavantageText.isDirty && commentDisavantageText.isEmptyError && (
							<Form.Text className='text-danger'>{commentDisavantageText.errorMessage}</Form.Text>
						)}
					</Form.Group>
				</Form>
				<Form.Label>Укажите оценку товара</Form.Label>
				<ReactStars
					count={5}
					size={28}
					value={3}
					onChange={ratingChanged}
					emptyIcon={<i className='far fa-star'></i>}
					halfIcon={<i className='fa fa-star-half-alt'></i>}
					fullIcon={<i className='fa fa-star'></i>}
					activeColor='#ffd700'
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Отмена
				</Button>
				<Button
					disabled={!commentText.isValid || !commentAdvantageText.isValid || !commentDisavantageText.isValid}
					onClick={handleAddComment}
					variant='primary'
				>
					Добавить отзыв
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
