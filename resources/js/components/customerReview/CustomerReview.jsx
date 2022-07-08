import React, { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'

export default function CustomerReview(props) {
	const { id } = props
	const [reviewFromToTotal, setReviewFromTo] = useState({ from: 0, to: 0, total: 0 })
	const [totalPage, setTotalPage] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [quantityStars, setQuantityStars] = useState({})
	const [sortStar, setSorStar] = useState(0)

	const [params, setParams] = useState({
		book_id: id,
		order: 'desc',
		per_page: 10,
		page: 1,
		rating_star: null
	})
	const [comments, setComments] = useState([])

	useEffect(() => {
		const commentBook = async () => {
			try {
				const res = await productApi.getReivewsBook(params)
				setComments(res.data)
				setCurrentPage(res.current_page)
				setReviewFromTo({ from: res.from, to: res.to, total: res.total })
				console.log('success get comment', res)
			} catch (error) {
				console.log('failed', error)
			}
		}
		commentBook()
	}, [params])
	useEffect(() => {
		const quantityStar = async () => {
			try {
				const res = await productApi.getQuantityStar({ book_id: params.book_id })
				setQuantityStars(res[0])
				console.log('success quantity star', res)
			} catch (error) {
				console.log('failed', error)
			}
		}
		quantityStar()
	},[])
	const handleSort = (e) => {
		setParams({ ...params, order: e.target.value })
	}
	const handleShow = (e) => {

		setParams({ ...params, per_page: e.target.value })
	}
	const handlePaging = (pageIdx) => {
		setParams({ ...params, page: pageIdx })
	}
	const handlePagingPre = () => {
		if (currentPage > 1) {
			setParams({ ...params, page: currentPage - 1 })
		}
	}
	const handlePagingNext = () => {
		if (currentPage < totalPage) {
			setParams({ ...params, page: currentPage + 1 })
		}
	}
	return (
		<div className='customer-review-container'>
			<h4>Customer Reiview</h4>
			<h3>4.6 Star</h3>
			<span className='total' onClick={() => { handleSortStar() }}>total({quantityStars.total_star_count})</span>
			<span >5 star({quantityStars.five_star_count})</span>
			<span >4 star({quantityStars.four_star_count})</span>
			<span >3 star({quantityStars.three_star_count})</span>
			<span >2 star({quantityStars.two_star_count})</span>
			<span >1 star({quantityStars.one_star_count})</span>

			<div className="sorting-container d-flex justify-content-between">
				<h6>Showing {reviewFromToTotal.from}-{reviewFromToTotal.to} of {reviewFromToTotal.total} books</h6>

				<div className="d-flex justify-content-end">
					<select onChange={(e) => handleSort(e)} className="form-select sort-select-date" aria-label="Default select example">
						<option value="desc">Sort by date: newest to oldest</option>
						<option value="asc">Sort by date: oldest to newest</option>
					</select>

					<select onChange={(e) => handleShow(e)} defaultValue='10' className="form-select filter-number-select" aria-label="Default select example">
						<option value="20">Show 20</option>
						<option value="15">Show 15</option>
						<option value="10">Show 10</option>
						<option value="5">Show 5</option>
					</select>
				</div>
			</div>
			{
				comments.map((ele, idx) => {
					return (
						<div key={idx} className='review-container'>
							<h5>{ele.review_title}<span>| {ele.rating_start} Stars</span></h5>
							<p>{ele.review_details}</p>
							<h6>{ele.review_date}</h6>
							<hr />
						</div>
					)
				})
			}
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


		</div>
	)
}
