import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardItem from '../../components/cardItem/CardItem';
import Footer from '../../components/footer/Footer';
import Pagination from 'react-bootstrap/Pagination';

export default function Shop() {
	const book = [{
		title: "The Fault in Our Stars",
		author: "John Green",
		imgUrl: "http://docsachcungcon.com/wp-content/uploads/2020/03/The-Fault-in-Our-Stars-cover-book-1.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "Don Quixote ( Đôn Ki-hô-tê)",
		author: "Miguel de Cervantes",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-donkihote.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-A-Tale-of-Two-Cities.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "The Fault in Our Stars",
		author: "John Green",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-The-Lord-of-the-Rings.jpeg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "The Little Prince",
		author: "Antoine de Saint-Exupéry",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-The-Little-Prince.jpeg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-A-Tale-of-Two-Cities.jpg",
		price: 12000,
		discount_price: 11000,
	}, {
		title: "The Fault in Our Stars",
		author: "John Green",
		imgUrl: "http://docsachcungcon.com/wp-content/uploads/2020/03/The-Fault-in-Our-Stars-cover-book-1.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "Don Quixote ( Đôn Ki-hô-tê)",
		author: "Miguel de Cervantes",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-donkihote.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-A-Tale-of-Two-Cities.jpg",
		price: 12000,
		discount_price: 11000,
	},
	{
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		imgUrl: "https://www.reader.com.vn/uploads/images/sach-ban-chay-nhat-moi-thoi-dai-A-Tale-of-Two-Cities.jpg",
		price: 12000,
		discount_price: 11000,
	}
	]
	const categoryList = ['trinh tham', 'phieu luu', 'lang man', 'truyen tranh']
	return (
		<div>
			<NavBar />
			<Container className='shop-container'>
				<Row>
					<Col sm={4} md={4} lg={2}>
						<h6>Filter by</h6>

						<div className="block-filter">
							<h1>Category</h1>
							<ul>
								{categoryList.map((ele, idx) => {
									return (
										<li key={idx}>{ele}</li>
									)
								})}
							</ul>
						</div>
						<div className="block-filter">
							<h1>Author</h1>
							<ul>
								{categoryList.map((ele, idx) => {
									return (
										<li key={idx}>{ele}</li>
									)
								})}
							</ul>
						</div>
						<div className="block-filter">
							<h1>Rating Review</h1>
							<ul>
								{[1, 2, 3, 4, 5].map((ele, idx) => {
									return (
										<li key={idx}>{ele} Star</li>
									)
								})}
							</ul>
						</div>
					</Col>

					<Col sm={8} md={8} lg={10}>
						<div className="sorting-container d-flex justify-content-between">
							<h6>Showing 1-20 of 126 books</h6>
							<div className="d-flex justify-content-end">
								<select class="form-select sort-select" aria-label="Default select example">
									<option value="0" selected>Sort by on sale</option>
									<option value="1">Sort by popular</option>
									<option value="2">Sort by price low</option>
									<option value="3">Sort by price high</option>
								</select>

								<select class="form-select filter-number-select" aria-label="Default select example">
									<option value="0" selected>Show 20</option>
									<option value="1">Show 15</option>
									<option value="2">Show 10</option>
									<option value="3">Show 5</option>
								</select>
							</div>
						</div>


						<Row xs={1} md={2} lg={4} className='g-4'>
							{book.map((ele, idx) => {
								return (
									<Col key={idx} className='col-item'>
										<CardItem book={ele} />
									</Col>
								)
							})}
						</Row>
						<nav aria-label="Page navigation example" className='d-flex justify-content-center'>
							<ul class="pagination">
								<li class="page-item"><a class="page-link" href="#">Previous</a></li>
								<li class="page-item"><a class="page-link" href="#">1</a></li>
								<li class="page-item"><a class="page-link" href="#">2</a></li>
								<li class="page-item"><a class="page-link" href="#">3</a></li>
								<li class="page-item"><a class="page-link" href="#">Next</a></li>
							</ul>
						</nav>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	)
}
