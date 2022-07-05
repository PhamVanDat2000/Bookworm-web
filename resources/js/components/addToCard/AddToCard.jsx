import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
export default function AddToCard() {
	const [quantity, setQuantity] = useState(0)
	return (
		<Card className='add-to-card'>
			<Card.Header className="d-flex justify-content-start">
				<span className="book-price">10000</span>
				<span className="discount-price">9000</span>
			</Card.Header>
			<Card.Body className="d-flex flex-column align-items-center">
				<h6>Quantity</h6>
				<div className="quatity-card">
					<span onClick={() => { if (quantity > 0) setQuantity(quantity - 1) }}>-</span>
					<span>{quantity}</span>
					<span onClick={() => setQuantity(quantity + 1)}>+</span>
				</div>
				<button className='btn-add-to-card'>Add to card</button>
			</Card.Body>
		</Card>
	)
}
