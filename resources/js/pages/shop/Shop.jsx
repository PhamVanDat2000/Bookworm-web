import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardItem from '../../components/cardItem/CardItem';
import Footer from '../../components/footer/Footer';
import shopApi from '../../../api/shopApi';
import FilterMenu from '../../components/filterMenu/FilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setListBook } from '../../features/shop/listbookSlice';

export default function Shop() {
	// const [books, setBooks] = useState([])
	const books = useSelector(state=>state.listbookReducer.listbook)
	const dispatch = useDispatch()
	const [bookFromToTotal, setBookFromTo] = useState({ from: 0, to: 0, total:0 })
	const [totalPage, setTotalPage] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [categoryList, setCategoryList] = useState([])
	const [authorList, setAuthorList] = useState([])
	const [isSort, setIsSort] = useState(true)
	const [paramsSortApi, setParamsSortApi] = useState({
		filter: 'sale',
		per_page: 5,
		order: 'desc',
		page: 1,
	})
	useEffect(() => {
		const listBookSort = async () => {
			try {
				const data = await shopApi.getListBookSort(paramsSortApi)
				console.log('Fetch book on Sale successfully: ', data)
				setTotalPage(data.last_page)
				setCurrentPage(data.current_page)
				dispatch(setListBook(data.data))
				setBookFromTo({from: data.from, to:data.to, total:data.total})
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
		}
		if (isSort) {
			listBookSort()
		}
	}, [paramsSortApi])

	useEffect(() => {
		const categoryList = async () => {
			try {
				const data = await shopApi.getListCategory()
				console.log('Fetch category list successfully: ', data)
				setCategoryList(data)
			} catch (error) {
				console.log('Failed to fetch category list: ', error)
			}
		}
		const authorList = async () => {
			try {
				const data = await shopApi.getListAuthor()
				console.log('Fetch book author list successfully: ', data)
				setAuthorList(data)
			} catch (error) {
				console.log('Failed to fetch author list: ', error)
			}
		}
		authorList()
		categoryList()
	}, [])
	const handleSort = (e) => {
		setIsSort(true)
		const data = e.target.value
		if (data === 'asc' || data === 'desc') {
			setParamsSortApi({ ...paramsSortApi, filter: 'price', order: data, page: 1 })
		}
		else {
			setParamsSortApi({ ...paramsSortApi, filter: data, page: 1 })
		}
	}
	const handleShow = (e) => {
		setParamsSortApi({ ...paramsSortApi, per_page: e.target.value, page: 1 })
	}
	const handlePaging = (pageIdx) => {
		setParamsSortApi({ ...paramsSortApi, page: pageIdx })
	}
	const handlePagingPre = () => {
		if (currentPage > 1) {
			setParamsSortApi({ ...paramsSortApi, page: currentPage - 1 })
		}
	}
	const handlePagingNext = () => {
		if (currentPage < totalPage) {
			setParamsSortApi({ ...paramsSortApi, page: currentPage + 1 })
		}
	}
	return (
		<div>
			<NavBar />
			<Container className='shop-container'>
				<Row>
					<Col sm={4} md={4} lg={2}>
						<h6>Filter By</h6>
						<FilterMenu
							nameMenu="Category"
							setCurrentPage={setCurrentPage}
							setTotalPage={setTotalPage}
							setParamsSortApi={setParamsSortApi}
							paramsSortApi={paramsSortApi}
							setIsSort={setIsSort}
							isSort={isSort}
							setBookFromTo={setBookFromTo}
							data={categoryList}
						/>
						<FilterMenu
							nameMenu="Author"
							setCurrentPage={setCurrentPage}
							setTotalPage={setTotalPage}
							setParamsSortApi={setParamsSortApi}
							paramsSortApi={paramsSortApi}
							setIsSort={setIsSort}
							isSort={isSort}
							setBookFromTo={setBookFromTo}
							data={authorList}
						/>
						<FilterMenu
							nameMenu="Rating Review"
							setCurrentPage={setCurrentPage}
							setTotalPage={setTotalPage}
							setParamsSortApi={setParamsSortApi}
							paramsSortApi={paramsSortApi}
							setIsSort={setIsSort}
							isSort={isSort}
							setBookFromTo={setBookFromTo}
							data={[5, 4, 3, 2, 1]}
						/>
					</Col>

					<Col sm={8} md={8} lg={10}>
						<div className="sorting-container d-flex justify-content-between">
							<h6>Showing {bookFromToTotal.from}-{bookFromToTotal.to} of {bookFromToTotal.total} books</h6>
							<div className="d-flex justify-content-end">
								<select onChange={(e) => handleSort(e)} className="form-select sort-select" aria-label="Default select example">
									<option value="sale">Sort by on sale</option>
									<option value="popular">Sort by popular</option>
									<option value="asc">Sort by price low to high</option>
									<option value="desc">Sort by price high to low</option>
								</select>

								<select onChange={(e) => handleShow(e)} defaultValue={"5"} className="form-select filter-number-select" aria-label="Default select example">
									<option value="25">Show 25</option>
									<option value="20">Show 20</option>
									<option value="15">Show 15</option>
									<option value="5" >Show 5</option>
								</select>
							</div>
						</div>


						<Row xs={1} md={2} lg={4} className='g-4'>
							{books.map((ele, idx) => {
								return (
									<Col key={idx} className='col-item'>
										<CardItem book={ele} />
									</Col>
								)
							})}
						</Row>
						<nav aria-label="Page navigation example" className='d-flex justify-content-center'>
							<ul className="pagination">
								<li onClick={() => handlePagingPre()} className={currentPage == 1 ? "page-item disabled" : "page-item"}>
									<a className="page-link" href='#'>Previous</a>
								</li>
								{
									[...Array(totalPage).keys()].map(x => x + 1).map((pageIdx, idx) => {
										if (currentPage === 1) {
											if ([1, 2, 3].includes(pageIdx)) {
												return (
													<li key={idx} onClick={() => handlePaging(pageIdx)} className={pageIdx == currentPage ? "page-item active" : "page-item "}>
														<a className="page-link" href='#'>{pageIdx}</a>
													</li>
												)
											}
										}
										else if (currentPage === totalPage) {
											if ([currentPage, currentPage - 1, currentPage - 2].includes(pageIdx)) {
												return (
													<li key={idx} onClick={() => handlePaging(pageIdx)} className={pageIdx === currentPage ? "page-item active" : "page-item "}>
														<a className="page-link" href='#'>{pageIdx}</a>
													</li>
												)
											}
										}
										else if ([currentPage, currentPage + 1, currentPage - 1].includes(pageIdx)) {
											return (
												<li key={idx} onClick={() => handlePaging(pageIdx)} className={pageIdx == currentPage ? "page-item active" : "page-item "}>
													<a className="page-link" href='#'>{pageIdx}</a>
												</li>
											)
										}
									})
								}
								<li onClick={() => handlePagingNext()} className={currentPage == totalPage ? "page-item disabled" : "page-item"}>
									<a className="page-link" href='#'>Next</a>
								</li>
							</ul>
						</nav>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div >
	)
}
