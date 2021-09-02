import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import FilterResults from 'react-filter-search'
import { getSearchData } from '../../redux/action-creators/search'
import { Container } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import '../../sass/searchBar.scss'

export const SearchBar = ({ category }) => {
	const dispatch = useDispatch()
	const path = useLocation().pathname
	const { searchResults } = useSelector(state => state.search)
	const [searchValue, setSearchValue] = useState('')
	const handleChange = e => setSearchValue(e.target.value)

	useEffect(() => {
		dispatch(getSearchData(category, searchValue))
	}, [dispatch, searchValue, category])

	return (
		<Container className='p-0'>
			<Row>
				<Col xl={10} className='d-flex justify-content-between align-items-center'>
					<FormControl value={searchValue} onChange={handleChange} placeholder='Что хотите найти?' />
				</Col>
			</Row>
			<Row>
				<Col>
					{searchValue && (
						<FilterResults
							value={searchValue}
							data={searchResults}
							renderResults={results => (
								<div className={'search-results-container'}>
									{results.length > 0 ? (
										results.splice(0, 7).map(item => (
											<Link className='text-decoration-none' to={`${path}/${item.id}`}>
												<div key={Math.random()} className='search-results-item border-bottom'>
													<div className=''>{item.name}</div>
													<div className='text-secondary'>{item.price} грн</div>
												</div>
											</Link>
										))
									) : (
										<h3>Ничего не найдено</h3>
									)}
								</div>
							)}
						/>
					)}
				</Col>
			</Row>
		</Container>
	)
}
