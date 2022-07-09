import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import ButtonCustom from '../../components/button/ButtonCustom';

export default function SignIn(props) {
	const { text } = props
	const [emailInput, setEmailInput] = useState('')
	const [pwInput, setPwInput] = useState('')
	const [modalShow, setModalShow] = useState(false);
	const [mode, setmode] = useState('signin')
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	const handleSubmitRegister = (e) => {
		e.preventDefault()
	}
	return (
		<>
			<span onClick={() => setModalShow(true)}>
				{text}
			</span>
			<Container>
				<Modal
					show={modalShow}
					onHide={() => setModalShow(false)}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					className='container-signin'
				>
					<Modal.Body>

						{mode === 'signin' ?
							<form onSubmit={(e) => handleSubmitSignIn(e)}>
								<h1>Sign In</h1>
								<input type="email" onChange={e => setEmailInput(e.target.value)} className="email-field" placeholder="Email" />
								<input type="password" onChange={e => setPwInput(e.target.value)} className="password-field" placeholder="Password" />
								<div className="btn-login">
									<ButtonCustom onClick={() => handleSubmit()} text={'Sign In'} />
								</div>
								<p className='d-flex justify-content-around'>
									<span onClick={() => setmode('register')}>Register</span>
									<span>Forgot password</span>
								</p>
							</form>
							:
							<form onSubmit={(e) => handleSubmitRegister(e)}>
								<h1>Register</h1>
								<input type="text" onChange={e => setFirstNameInput(e.target.value)} className="name-field" placeholder="First name" />
								<input type="text" onChange={e => setLastNameInput(e.target.value)} className="name-field" placeholder="Last name" />
								<input type="email" onChange={e => setEmailInput(e.target.value)} className="email-field" placeholder="Email" />
								<input type="password" onChange={e => setPwInput(e.target.value)} className="password-field" placeholder="Password" />
								<div className="btn-login">
									<ButtonCustom onClick={() => handleSubmit()} text={'Sign In'} />
								</div>
								<p className='d-flex justify-content-around'>
									<span onClick={() => setmode('signin')}>SignIn</span>
									<span>Forgot password</span>
								</p>
							</form>
						}
					</Modal.Body>
				</Modal>

			</Container>
		</>
	)
}
