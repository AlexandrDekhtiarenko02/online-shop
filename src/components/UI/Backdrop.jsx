import React from 'react'
import Col from 'react-bootstrap/Col'
import { Spinner } from 'react-bootstrap'
import '../../sass/backdrop.scss'

export const Backdrop = () => {
	return (
		<Col className='backdrop'>
			<Spinner variant='light' animation='border' role='status' />
		</Col>
	)
}
