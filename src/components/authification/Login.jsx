import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginUser } from '../../redux/action-creators/auth'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useInput } from '../../hooks/useInput'

export const Login = ({ toRegister }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const email = useInput('', { isEmail: true, isEmpty: true })
	const password = useInput('', { isPassword: true, isEmpty: true })
	const { isAuth } = useSelector(state => state.auth)
	const onLogin = () => dispatch(loginUser(email.value, password.value))

	useEffect(() => {
		if (isAuth) {
			history.go(0)
		}
	}, [isAuth, history])

	return (
		<>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>Вход</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Електронная почта</Form.Label>
						<Form.Control
							value={email.value}
							onChange={email.onChange}
							onBlur={email.onBlur}
							type='text'
							placeholder='Введите электронную почту'
						/>
						{email.isDirty && email.isEmailError && <Form.Text className='text-danger'>{email.errorMessage}</Form.Text>}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							value={password.value}
							onBlur={password.onBlur}
							onChange={password.onChange}
							type='password'
							placeholder='Введите пароль'
						/>
						{password.isDirty && password.isPasswordError && <Form.Text className='text-danger'>{password.errorMessage}</Form.Text>}
					</Form.Group>
					<Row className='d-flex justify-content-between align-items-center'>
						<Col xl={7}>
							<Button disabled={!email.isValid || !password.isValid} onClick={onLogin}>
								Войти
							</Button>
						</Col>
						<Col xl={1}>
							<span>или</span>
						</Col>
						<Col xl={3}>
							<Button onClick={toRegister} variant='outline-primary'>
								Зарегистрироваться
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</>
	)
}
