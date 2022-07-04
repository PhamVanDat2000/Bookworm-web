import React from 'react'
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navBar/NavBar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function About() {
	return (<>

		<NavBar />
		<div className='about-container'>
			<Container className='sub-about-container'>
				<h5>About us</h5>
				<hr />
				<Row className='d-flex justify-content-center'>
					<Col xs={12} md={10} lg={8}>
						<h1 style={{ 'textAlign': 'center' }}>Welcome to Bookworm</h1>
						<p>Bookworm is an independent New York bookstore and language school with locations in
							Manhattan and Brooklyn. We specialize in travel books and language classes.</p>
						<Row xs={1} md={2} lg={2}>
							<Col>
								<h2>Our Story</h2>
								<p>The name Bookworm was taken from the original name for New York International Airport,
									which was renamed JFK in December 1963.</p>
								<p>Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue
									South, at the corner of Perry Street.</p>
								<p>From March 2008 through May 2016, the store was located in the Flatiron District.</p>
							</Col>
							<Col>
								<h2>Our Vision</h2>
								<p>One of the last travel bookstores in the country, our Manhattan store carries a range of
									guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.
								</p>
								<p>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook,
									and our well-read, well-travelled staff is happy to make reading recommendations for any
									traveller, book lover, or gift giver.</p>
							</Col>
						</Row>
					</Col>
				</Row>
				{/* <Container className='d-flex align-items-center flex-column'>

				</Container> */}
			</Container>
			<Footer />
		</div>
	</>
	)
}
