import React from 'react'
import Footer from '../../components/footer/Footer'
import NavBar from '../../components/navBar/NavBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityItem } from '../../features/cart/cartSlice';
import IMAGE from '../../../assets';
import ButtonCustom from '../../components/button/ButtonCustom';
import cardApi from '../../../api/cartApi';

export default function Cart() {
	const cart = useSelector(state => state.cartReducer.cart)
	let dataProduct = cart.map((ele) => {
		return {
			book_id: ele.book_id,
			quantity: ele.quantity,
			price: ele.quantity * ele.final_price
		}
	})
	console.log(cart)
	const dispatch = useDispatch()
	const handleAddQuantity = (id, quantity) => {
		if (quantity < 8) {
			dispatch(changeQuantityItem({ id: id, quantity: quantity + 1 }))
		}
	}
	const handleMinusQuantity = (id, quantity) => {
		if (quantity > 1) {
			dispatch(changeQuantityItem({ id: id, quantity: quantity - 1 }))
		}
	}
	const placeOrder = async () => {
		try {
			const res = await cardApi.placeOrderApi({
				user_id: 3,
				order_amount: dataProduct.reduce((acc, currVal) => { return acc + currVal.quantity }, 0),
				products: dataProduct
			})
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}
	const handlePlaceOrder = () => {
		console.log('place order')
		placeOrder()
	}
	return (
		<>
			<NavBar />
			<Container>
				<Row xs={1} lg={2} className='mb-3'>
					<Col lg={8} className="mt-2">
						<Card>
							<Card.Header>
								<Row>
									<Col lg={4}>
										<h6>Product</h6>
									</Col>
									<Col lg={8}>
										<Row>
											<Col>
												<h6>Price</h6>
											</Col>
											<Col>
												<h6>Quantity</h6>
											</Col>
											<Col>
												<h6>Total</h6>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card.Header>
							<Card.Body>
								{
									cart.map((ele, idx) => {
										return (
											<Row key={idx}>
												<Col lg={4}>
													<Row lg={2} >
														<Col>
															<img className='img-cart' src={ele.book_cover_photo ? IMAGE[ele.book_cover_photo] : IMAGE['bookDefault']} alt="book image" />
														</Col>
														<Col className='d-flex justify-content-center flex-column'>
															<h6 className='text-truncate'>{ele.book_title}</h6>
															<p >{ele.author_name}</p>
														</Col>
													</Row>
												</Col>
												<Col lg={8}>
													<Row className='d-flex align-items-center h-100'>
														<Col>
															{
																ele.discount_price === ele.final_price ?
																	<>
																		<h6>{ele.discount_price}</h6>
																		<h6>{ele.book_price}</h6>
																	</>
																	:
																	<h6>{ele.book_price}</h6>

															}
														</Col>
														<Col>
															<div className='quantity-cart d-flex justify-content-between'>
																<button onClick={() => handleMinusQuantity(ele.id, ele.quantity)}>-</button>
																<span>{ele.quantity}</span>
																<button onClick={() => handleAddQuantity(ele.id, ele.quantity)}>+</button>
															</div>
														</Col>
														<Col>
															<h6>{(ele.discount_price * ele.quantity).toFixed(2)}</h6>
														</Col>
													</Row>
												</Col>
												<hr className='mt-2' />
											</Row>
										)
									})

								}
							</Card.Body>
						</Card>
					</Col>
					<Col lg={4} xs={8} className='mt-2 m-auto'>
						<Card>
							<Card.Header className='d-flex justify-content-center'>Cart Totals</Card.Header>
							<Card.Body>
								<Card.Title className='d-flex justify-content-center mt-4 mb-4'>$
									{
										cart.reduce((acc, currVal) => {
											return acc + currVal.quantity * currVal.final_price
										}, 0)
									}
								</Card.Title>
								<div className='w-75 m-auto mt-4 mb-4' onClick={() => handlePlaceOrder()}>
									<ButtonCustom text={'Place Order'} />
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	)
}
