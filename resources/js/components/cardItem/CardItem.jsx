import React from 'react'
import Card from 'react-bootstrap/Card';
import IMAGE from '../../../assets';
export default function CardItem(props) {
	const { book } = props
	return (
		<Card className='card-item'>
			<Card.Img variant="top" src={book.book_cover_photo ? IMAGE[book.book_cover_photo] :IMAGE['bookDefault']} />
			<Card.Body>
				<Card.Title className='text-truncate'>{book.book_title}</Card.Title>
				<Card.Text>
					{book.author_name}
				</Card.Text>
			</Card.Body>
			<Card.Body className='card-price-book'>
				{
					book.final_price === book.discount_price ?
						<>
							<Card.Text style={{ 'textDecoration': 'line-through' }}>${book.book_price}</Card.Text>
							<Card.Text className='text-price'>${book.discount_price}</Card.Text>
						</>
						:
						<Card.Text className='text-price'>${book.book_price}</Card.Text>

				}
			</Card.Body>
		</Card>
	)
}
