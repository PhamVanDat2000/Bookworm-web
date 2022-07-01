import React from 'react'
import Card from 'react-bootstrap/Card';
// import '../../../css/cardItem.css'
export default function CardItem(props) {
	const { book } = props
	return (
		<Card>
			<Card.Img variant="top" src={book.imgUrl}/>
			<Card.Body>
				<Card.Title>{book.title}</Card.Title>
				<Card.Text>
					{book.author}
				</Card.Text>
			</Card.Body>
			<Card.Body className='card-price-book'>
				<Card.Text style={{ 'textDecoration': 'line-through' }}>${book.price}</Card.Text>
				<Card.Text>${book.discount_price}</Card.Text>
			</Card.Body>
		</Card>
	)
}
