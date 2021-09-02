import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Login } from './Login'
import { Register } from './Register'
export const Auth = props => {
	const [isLogin, setIsLogin] = useState(true)
	const changeToLogin = () => setIsLogin(true)
	const changeToRegister = () => setIsLogin(false)
	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			{isLogin ? <Login toRegister={changeToRegister} /> : <Register toLogin={changeToLogin} />}
		</Modal>
	)
}
