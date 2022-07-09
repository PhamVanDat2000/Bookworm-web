import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../features/card/cardSlice';
import ButtonCustom from '../button/ButtonCustom';


export default function AddToCard(props) {
	const { book } = props
	const [quantity, setQuantity] = useState(1)
	const dispatch = useDispatch()

	const handleMinus = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
			dispatch(decrement())
		}
	}
	const handleAdd = () => {
		if (quantity < 8) {
			setQuantity(quantity + 1)
			dispatch(increment())
		}
	}
	return (
		<Card className='add-to-card'>
			<Card.Header className="d-flex justify-content-start">
				<span className="book-price">${(book.book_price * quantity).toFixed(2)}</span>
				<span className="discount-price">${(book.discount_price * quantity).toFixed(2)}</span>
			</Card.Header>
			<Card.Body className="d-flex flex-column align-items-center">
				<h6>Quantity</h6>
				<div className="quatity-card">
					<button onClick={() => handleMinus()}>-</button>
					<span>{quantity}</span>
					<button onClick={() => handleAdd()}>+</button>
				</div>
				<div className='d-flex justify-content-center w-100'>
					<ButtonCustom text={'Add to card'} />
				</div>
			</Card.Body>
		</Card>
	)
}
