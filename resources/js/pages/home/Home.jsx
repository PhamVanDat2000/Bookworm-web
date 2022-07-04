import React from 'react'
import CardItem from '../../components/cardItem/CardItem';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function Home() {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4
		},
		tablet: {
			breakpoint: { max: 1024, min: 800 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 800, min: 0 },
			items: 1
		}
	};
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
			<Container className='container-onsale-title' >
				<div className='onsale-title'>
					<h1>On Sale</h1>
					<Button variant="primary">View all</Button>
				</div>
			</Container>
			<Container className='container-carousel'>
				<Carousel responsive={responsive} infinite={true} className='carousel-book'>
					{book.map((ele, idx) => {
						return (
							<CardItem book={ele} key={idx} />
						)
					})}
				</Carousel>
			</Container>
			<Container className='container-featured'>
				<h1>Featured Books</h1>
				<div className="filter-featured-book">
					<h2 className='featured-active'>Recommended</h2>
					<h2>Popular</h2>
				</div>
			</Container>
			<Container>
				<Row xs={1} md={2} lg={4} className='g-4'>
					{book.map((ele, idx) => {
						return (
							<Col key={idx} className='col-item'>
								<CardItem book={ele} />
							</Col>
						)
					})}
				</Row>
			</Container>
			<Footer/>
		</div>
	)
}
export default Home;