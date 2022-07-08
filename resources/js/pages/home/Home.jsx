import React, { useEffect, useState } from 'react'
import CardItem from '../../components/cardItem/CardItem';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import homeApi from '../../../api/homeApi';
function Home() {
	const [topBookDiscount, setTopBookDiscount] = useState([])
	const [topBookRecommended, setTopBookRecommended] = useState([])
	const [topBookPopularity, setTopBookPopularity] = useState([])
	const [featured, setFeatured] = useState('recommended')
	useEffect(() => {
		const bookDiscount = async () => {
			try {

				const params = { total: 10 };
				const data = await homeApi.getBookDiscount(params)
				console.log('Fetch book discount successfully: ', data);
				setTopBookDiscount(data)
			} catch (error) {

				console.log('Failed to fetch books list: ', error)
			}
		}
		const bookRecommended = async () => {
			try {
				const params = { total: 8 };
				const data = await homeApi.getBookRecommended(params)
				console.log('Fetch book recommended successfully: ', data);
				setTopBookRecommended(data)
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
		}
		const bookPopularity = async () => {
			try {
				const params = { total: 8 };
				const data = await homeApi.getBookPopularity(params)
				console.log('Fetch book popularity successfully: ', data);
				setTopBookPopularity(data)
			} catch (error) {
				console.log('Failed to fetch books list: ', error)
			}
			const params = { total: 8 };
			const data = await homeApi.getBookPopularity(params)
			console.log('Fetch book popularity successfully: ', data);
			setTopBookPopularity(data)
		}
		bookDiscount()
		bookRecommended()
		bookPopularity()

	}, [])
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
					{topBookDiscount.map((ele, idx) => {
						return (
							<CardItem book={ele} key={idx} />
						)
					})}
				</Carousel>
			</Container>
			<Container className='container-featured'>
				<h1>Featured Books</h1>
				<div className="filter-featured-book">
					<h2 className={featured == 'recommended' ? 'featured-active' : ''} onClick={() => setFeatured('recommended')}>Recommended</h2>
					<h2 className={featured == 'populary' ? 'featured-active' : ''} onClick={() => setFeatured('populary')}>Popular</h2>
				</div>
			</Container>
			<Container>
				<Row xs={1} md={2} lg={4} className='g-4'>
					{
						(featured === 'recommended' ? topBookRecommended : topBookPopularity).map((ele, idx) => {
							return (
								<Col key={idx} className='col-item'>
									<CardItem book={ele} />
								</Col>
							)
						})
					}
				</Row>
			</Container>
			<Footer />
		</div>
	)
}
export default Home;