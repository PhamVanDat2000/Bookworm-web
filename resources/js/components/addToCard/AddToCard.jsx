import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AlertCustom from '../alert/AlertCustom';
import ButtonCustom from '../button/ButtonCustom';


export default function AddToCart(props) {
	const { book } = props
	const [quantity, setQuantity] = useState(1)

	const handleMinus = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}
	const handleAdd = () => {
		if (quantity < 8) {
			setQuantity(quantity + 1)
		}
	}

	const [variant, setVariant] = useState('')
	const [children, setChildren] = useState('')
	var allEntries = JSON.parse(localStorage.getItem('cart')) || [];
	const handleAddCart = () => {
		const data = {
			book_id: book.book_id,
			book_title: book.book_title,
			author_name: book.author_name,
			book_cover_photo: book.book_cover_photo,
			book_price: book.book_price,
			discount_price: book.discount_price,
			final_price: book.final_price,
			quantity: quantity
		}
		var flag = false
		const newData = allEntries.map((ele, idx) => {
			if (ele.book_id == data.book_id) {
				flag = true
				if (ele.quantity + data.quantity > 8) {
					return { ...ele, quantity: 8 }
				}
				else {
					return { ...ele, quantity: ele.quantity + data.quantity }
				}
			}
			return ele
		})
		if (flag === false) {
			newData.push(data);
		}

		setVariant('success')
		setChildren('add to cart successful')
		localStorage.setItem('cart', JSON.stringify(newData))
	}
	return (
		<>
			{
				variant ?
					<AlertCustom variant={variant} children={children} />
					:
					null
			}
			<Card className='add-to-card'>
				<Card.Header className="d-flex justify-content-start">
					{
						book.discount_price == book.final_price ?
							<>
								<span className="book-price">${(book.book_price * quantity).toFixed(2)}</span>
								<span className="discount-price">${(book.discount_price * quantity).toFixed(2)}</span>
							</>
							:
							<span className="discount-price">${(book.book_price * quantity).toFixed(2)}</span>
					}
				</Card.Header>
				<Card.Body className="d-flex flex-column align-items-center">
					<h6>Quantity</h6>
					<div className="quatity-cart">
						<button onClick={() => handleMinus()}>-</button>
						<span>{quantity}</span>
						<button onClick={() => handleAdd()}>+</button>
					</div>
					<div onClick={() => handleAddCart()} className='d-flex justify-content-center w-100'>
						<ButtonCustom text={'Add to cart'} />
					</div>
				</Card.Body>
			</Card>
		</>
	)
}
