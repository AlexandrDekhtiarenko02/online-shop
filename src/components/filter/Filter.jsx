import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { SERVER_URL } from '../../utils/auth'
import { RangeDoubleSlider } from '../UI/RangeDoubleSlider'
import { scrollToTop } from '../../utils/scroll'
import { useDispatch } from 'react-redux'
import { setFilterUrl } from '../../redux/action-creators/products'
export const Filter = ({ hideFilter, category }) => {
	const dispatch = useDispatch()
	const [filterConditions, setFilterConditions] = useState([])
	const [filterListData, setFilterListData] = useState([])
	const [prices, setPrices] = useState([])
	const url = `${SERVER_URL}/${category}`

	const handleHideFilter = () => hideFilter(false)
	const removeFilterCondition = value => setFilterConditions(filterConditions.filter(item => item.value !== value))
	const addFilterCondition = (condition, value, isRange) => {
		if (filterConditions.some(el => el.condition === condition) && isRange) {
			const conditions = [...filterConditions].map(item => (item.condition === condition ? { ...item, value: value } : item))
			setFilterConditions(conditions)
		} else {
			setFilterConditions([...filterConditions, { condition, value }])
		}
	}
	const getCharacteristicsList = data => {
		const obj = {}
		data.forEach(item => {
			Object.entries(item)
				.filter(item => item[1].characteristic === true)
				.forEach(i => {
					obj[i[1].title] = (obj[i[1].title] || [i[1].query]).concat(i[1].value)
				})
		})
		return Object.entries(obj)
	}

	const filterData = () => {
		let filterQuery = ''
		filterConditions.forEach(item => {
			if (Array.isArray(item.value)) {
				filterQuery += `${item.condition}${item.condition === 'price' ? '' : '.value'}_gte=${item.value[0]}&${item.condition}${
					item.condition === 'price' ? '' : '.value'
				}_lte=${item.value[1]}&`
			} else {
				filterQuery += `${item.condition}.value=${item.value}&`
			}
		})
		dispatch(setFilterUrl(`${SERVER_URL}/${category}?${filterQuery}`))
		scrollToTop()
		if (hideFilter) {
			handleHideFilter()
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(url)
			setFilterListData(response.data)
			setPrices(response.data.map(item => item.price))
		}
		fetchData()
	}, [url])
	
	return (
		<Row>
			{getCharacteristicsList(filterListData).map((item, index) => (
				<Col key={item[0] + index} xl={12} className='mt-5'>
					<p>{item[0]}</p>
					{[...new Set(item[1])].slice(1).length > 5 && [...new Set(item[1])].slice(1).every(el => typeof el === 'number') ? (
						<Row>
							<Col>
								<RangeDoubleSlider
									min={Math.min(...[...new Set(item[1])].slice(1))}
									max={Math.max(...[...new Set(item[1])].slice(1))}
									onChange={({ min, max }) => addFilterCondition(item[1][0], [min, max], true)}
								/>
							</Col>
						</Row>
					) : (
						<Row>
							{[...new Set(item[1])].slice(1).map((value, index) => (
								<Col key={value + index} className='m-3' xl={12}>
									<label className='characteristic-label'>
										<input
											onChange={e => {
												e.target.checked ? addFilterCondition(item[1][0], value) : removeFilterCondition(value)
											}}
											className='characteristic-block-checkbox'
											id={`${value} checkbox`}
											type='checkbox'
										/>
										<span className='m-3'>{value}</span>
									</label>
								</Col>
							))}
						</Row>
					)}
				</Col>
			))}
			{prices.length && (
				<Row className='mt-5 mb-5'>
					<Col xs={12}>
						<p>Цена, грн</p>
					</Col>
					<Col>
						<Row>
							<Col>
								<RangeDoubleSlider
									min={Math.min(...prices)}
									max={Math.max(...prices)}
									onChange={({ min, max }) => addFilterCondition('price', [min, max], true)}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			)}
			<Row>
				<Col>
					<Button variant='success' onClick={filterData}>
						Найти
					</Button>
				</Col>
			</Row>
		</Row>
	)
}
