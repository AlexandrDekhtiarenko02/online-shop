import { useState, useEffect } from 'react'
export const useValidation = (value, validations) => {
	const [isEmptyError, setIsEmptyError] = useState(false)
	const [isPhoneError, setIsPhoneError] = useState(false)
	const [isEmailError, setIsEmailError] = useState(false)
	const [isPasswordError, setIsPasswordError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isValid, setIsValid] = useState(false)
	
	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'isEmpty':
					if (value.length) {
						setIsEmptyError(false)
					} else {
						setIsEmptyError(true)
						setErrorMessage('Поле не должно быть пустым')
					}
					break
				case 'isPhone':
					const regexPhone = /^\+?3?8?(0[5-9][0-9]\d{7})$/
					if (regexPhone.test(String(value).toLowerCase())) {
						setIsPhoneError(false)
					} else {
						setIsPhoneError(true)
						setErrorMessage('Номер телефона не соответствует формату +380XXXXXXXXX')
					}
					break
				case 'isEmail':
					const regexEmail = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/
					if (regexEmail.test(String(value).toLowerCase())) {
						setIsEmailError(false)
					} else {
						setIsEmailError(true)
						setErrorMessage('Некорректный формат почты')
					}
					break
				case 'isPassword':
					const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
					if (regexPassword.test(value.toLowerCase())) {
						setIsPasswordError(false)
					} else {
						setIsPasswordError(true)
						setErrorMessage('Пароль должен иметь длину не менее восемь символов и содержать заглавные или строчные буквы и цифры')
					}
					break
				default:
					console.log('Некорректное условие валидации')
			}
		}
	}, [value, validations])

	useEffect(() => {
		if (isEmptyError || isPhoneError || isEmailError || isPasswordError) {
			setIsValid(false)
		} else {
			setIsValid(true)
		}
	}, [isEmptyError, isPhoneError, isEmailError, isPasswordError])
	return {
		isEmptyError,
		isEmailError,
		isPhoneError,
		errorMessage,
		isPasswordError,
		isValid,
	}
}
