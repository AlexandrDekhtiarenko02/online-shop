import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../../redux/action-creators/auth'
import { useInput } from '../../hooks/useInput'

export const Register = ({ toLogin }) => {
	const dispatch = useDispatch()
	const { isAuth } = useSelector(state => state.auth)
	const history = useHistory()
	const name = useInput('', { isEmpty: true })
	const surname = useInput('', { isEmpty: true })
	const phone = useInput('', { isEmpty: true, isPhone: true })
	const email = useInput('', { isEmpty: true, isEmail: true })
	const password = useInput('', { isEmpty: true, isPassword: true })
	const confirmPassword = useInput('')

	const onRegister = () => {
		dispatch(
			registerUser({
				name: name.value,
				surname: surname.value,
				phone: phone.value,
				email: email.value,
				password: password.value,
				orders: [],
				wishList: [],
				viewedProducts: [],
			})
		)
	}

	useEffect(() => {
		if (isAuth) {
			history.go(0)
		}
	}, [isAuth, history])
	return (
		<>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>Регистрация</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row className='mb-3'>
						<Form.Group as={Col}>
							<Form.Label>Имя</Form.Label>
							<Form.Control value={name.value} onChange={name.onChange} onBlur={name.onBlur} type='text' placeholder='Введите ваше имя' />
							{name.isDirty && name.isEmptyError && <Form.Text className='text-danger'>{name.errorMessage}</Form.Text>}
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Фамилия</Form.Label>
							<Form.Control
								value={surname.value}
								onChange={surname.onChange}
								onBlur={surname.onBlur}
								type='text'
								placeholder='Введите вашу фамилию'
							/>
						</Form.Group>
					</Row>
					<Form.Group className='mb-3'>
						<Form.Label>Номер телефона</Form.Label>
						<Form.Control value={phone.value} onChange={phone.onChange} onBlur={phone.onBlur} type='text' placeholder='+380XXXXXXXXX' />
						{phone.isDirty && phone.isPhoneError && <Form.Text className='text-danger'>{phone.errorMessage}</Form.Text>}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Електронная почта</Form.Label>
						<Form.Control
							value={email.value}
							onChange={email.onChange}
							onBlur={email.onBlur}
							type='text'
							placeholder='Введите вашу электронную почту'
						/>
						{email.isDirty && email.isEmailError && <Form.Text className='text-danger'>{email.errorMessage}</Form.Text>}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							value={password.value}
							onChange={password.onChange}
							onBlur={password.onBlur}
							type='password'
							placeholder='Придумайте пароль'
						/>
						{password.isDirty && password.isPasswordError && <Form.Text className='text-danger'>{password.errorMessage}</Form.Text>}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Подтверждение пароля</Form.Label>
						<Form.Control
							value={confirmPassword.value}
							onChange={confirmPassword.onChange}
							onBlur={confirmPassword.onBlur}
							type='password'
							placeholder='Введите пароль ещё раз'
						/>
						{confirmPassword.isDirty && password.value !== confirmPassword.value && (
							<Form.Text className='text-danger'>Пароли не совпадают</Form.Text>
						)}
					</Form.Group>
					<Row className='d-flex align-items-center'>
						<Col xl={3}>
							<Button
								disabled={
									!name.isValid ||
									!surname.isValid ||
									!phone.isValid ||
									!email.isValid ||
									!password.isValid ||
									password.value !== confirmPassword.value
								}
								onClick={onRegister}
							>
								Зарегистрироваться
							</Button>
						</Col>
						<Col xl={3}>
							<span>или если есть аккаунт</span>
						</Col>
						<Col>
							<Button onClick={toLogin} variant='outline-primary'>
								Войти
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</>
	)
}
