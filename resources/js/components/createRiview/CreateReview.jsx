import React from 'react'
import Card from 'react-bootstrap/Card';
import ButtonCustom from '../button/ButtonCustom';

export default function CreateReview() {
	return (
		<Card >
			<Card.Header className="d-flex justify-content-start">
				<h5>Write a Review</h5>
			</Card.Header>
			<Card.Body className="d-flex flex-column align-items-center">
				<form>
					<div className="form-group mb-4">
						<label htmlFor="inputTitle">Add a title</label>
						<input type="text" className="form-control" id="inputTitle" aria-describedby="emailHelp" />
					</div>
					<div className="form-group mb-4">
						<label htmlFor="inputDetail">Details please! Your review helps other shoppers</label>
						<input type="text" className="form-control" id="inputDetail" />
					</div>
					<div className="form-group mb-4">
						<label htmlFor="FormControlSelect1">Select a rating star</label>
						<select className="form-control" id="FormControlSelect1">
							{
								[1, 2, 3, 4, 5].map((ele, idx) => {
									return (
										<option key={idx}>{ele} Star</option>
									)
								})
							}
						</select>
					</div>
					<div className='d-flex justify-content-center'>
						<ButtonCustom text={'Submit Review'} />
					</div>
				</form>
			</Card.Body>
		</Card>
	)
}
