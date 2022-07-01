import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardItem from '../../components/cardItem/CardItem';

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
	return (
		<div>
			<NavBar />
			<Container>
				<Row>
					<Col sm={2} md={2} lg={2}>
						filter by
					</Col>

					<Col sm={10} md={12} lg={10}>
						<Row xs={1} md={2} lg={4} className='g-4'>
							{book.map((ele, idx) => {
								return (
									<Col key={idx} className='col-item'>
										<CardItem book={ele} />
									</Col>
								)
							})}
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
