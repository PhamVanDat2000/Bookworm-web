import React, { useEffect, useState } from 'react'
import { Accordion, Card } from "react-bootstrap";
import shopApi from '../../../api/shopApi';
export default function FilterMenu(props) {
	const { nameMenu, setBooks, setCurrentPage, setTotalPage, setParamsSortApi, paramsSortApi, setIsSort, isSort, data } = props
	const [authorId, setAuthorId] = useState()
	const [categoryId, setCategoryId] = useState()
	const [star, setStar] = useState()
	const [fieldFilter, setfieldFilter] = useState('')

	useEffect(() => {
		const filterByAuthor = async () => {
			try {
				const params = { id: authorId, per_page: paramsSortApi.per_page, page: paramsSortApi.page }
				const data = await shopApi.getFilterByAuthor(params)
				console.log('Fetch book filter by author successfully: ', data)
				setTotalPage(data.last_page)
				setCurrentPage(data.current_page)
				setBooks(data.data)
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
		}
		const filterCategory = async () => {
			try {
				const params = { id: categoryId, per_page: paramsSortApi.per_page, page: paramsSortApi.page }
				const data = await shopApi.getFilterByCategory(params)
				console.log('Fetch book filter by category successfully: ', data)
				setTotalPage(data.last_page)
				setCurrentPage(data.current_page)
				setBooks(data.data)
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
		}
		const filterStar = async () => {
			try {
				const params = { rating_start: star, per_page: paramsSortApi.per_page, page: paramsSortApi.page }
				const data = await shopApi.getFilterByStar(params)
				console.log('Fetch book filter by star successfully: ', data)
				setTotalPage(data.last_page)
				setCurrentPage(data.current_page)
				setBooks(data.data)
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
		}
		if (!isSort) {
			if (fieldFilter === 'AUTHOR') {
				filterByAuthor()
			}
			if (fieldFilter === 'CATEGORY') {
				filterCategory()
			}
			if (fieldFilter === 'STAR') {
				filterStar()
			}
		}
	}, [authorId, categoryId, star, paramsSortApi])

	const handleAuthor = (id) => {
		setfieldFilter('AUTHOR')
		setParamsSortApi({ ...paramsSortApi, page: 1 })
		setIsSort(false)
		setAuthorId(id)
	}
	const handleCategory = (id) => {
		setfieldFilter('CATEGORY')
		setParamsSortApi({ ...paramsSortApi, page: 1 })
		setIsSort(false)
		setCategoryId(id)
	}
	const handleStar = (star) => {
		setfieldFilter('STAR')
		setParamsSortApi({ ...paramsSortApi, page: 1 })
		setIsSort(false)
		setStar(star)
	}
	return (
		<div>
			<Accordion className='accordion-container'>
				<Card>
					<Accordion.Toggle className='accordion-header' as={Card.Header} eventKey="0">
						{nameMenu}
					</Accordion.Toggle>
					{
						data.map((ele, idx) => {
							return (
								<Accordion.Collapse className='accordion-item' key={idx} eventKey="0">
									{
										nameMenu === 'Rating Review' ?
											<Card.Body onClick={() => handleStar(ele)}>{ele} Star</Card.Body> :
											(
												nameMenu === 'Author' ?
													<Card.Body onClick={() => handleAuthor(ele.id)}>{ele.author_name}</Card.Body> :
													<Card.Body onClick={() => handleCategory(ele.id)}>{ele.category_name}</Card.Body>
											)

									}
								</Accordion.Collapse>
							)
						})
					}
				</Card>
			</Accordion>
		</div>
	)
}
