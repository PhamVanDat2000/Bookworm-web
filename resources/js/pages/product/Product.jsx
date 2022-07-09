import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import NavBar from '../../components/navBar/NavBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddToCard from '../../components/addToCard/AddToCard';
import CustomerReview from '../../components/customerReview/CustomerReview';
import productApi from '../../../api/productApi';
import IMAGE from '../../../assets';
import CreateReview from '../../components/createRiview/CreateReview';
import { useParams } from 'react-router-dom';
export default function Product() {
	const { id } = useParams()
	const [book, setBook] = useState({})
	useEffect(() => {
		const bookDetail = async () => {
			try {
				const param = { id: id }
				const data = await productApi.getBookDetail(param)
				setBook(data[0])
				console.log('success get book detail', data[0])
			} catch (error) {
				console.log('failed', error)
			}
		}
		bookDetail()
	}, [])
	return (
		<>
			<NavBar />
			<Container>
				<Row className='d-flex justify-content-center'>
					<Col xs={12} md={10} lg={10}>
						<h1>{book.category_name}</h1>
						<Row xs={1} lg={2} className='mb-3'>
							<Col lg={8} className="product-item-container">
								<Row>
									<Col xs={3} md={4} className="p-0">
										<img className='product-img' src={book.book_cover_photo ? IMAGE[book.book_cover_photo] : IMAGE['bookDefault']} alt="book image" />
										<h6 className='title-img'>By (author) {book.author_name}</h6>
									</Col>
									<Col xs={9} md={8} className='product-desctiption'>
										<h5>{book.book_title}</h5>
										<p>{book.book_summary}</p>
									</Col>
								</Row>
							</Col>
							<Col lg={4} xs={8} className='mt-2 m-auto'>
								<AddToCard book={book} />
							</Col>
						</Row>

						<Row xs={1} lg={2} className='mb-3'>
							<Col lg={8} className="product-item-container">
								<Row>
									<CustomerReview id={id} />
								</Row>
							</Col>
							<Col lg={4}>
								<CreateReview />
							</Col>
						</Row>
					</Col>
				</Row>

			</Container>
			<Footer />
		</>
	)
}
