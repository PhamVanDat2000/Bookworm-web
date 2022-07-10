
import React, { useState } from 'react'
import ButtonCustom from '../../components/button/ButtonCustom'
import Container from 'react-bootstrap/Container';
import { Modal } from 'react-bootstrap';

export default function Login() {
	
	const [modalShow, setModalShow] = useState(false);
	const [mode, setmode] = useState('signin')
	return (
		<div>
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
						<form>
							<h1>Register</h1>
							<input type="text" onChange={e => setDataRegister({ ...dataRegister, first_name: e.target.value })} className="name-field" placeholder="First name" />
							<input type="text" onChange={e => setDataRegister({ ...dataRegister, last_name: e.target.value })} className="name-field" placeholder="Last name" />
							<input type="email" onChange={e => setDataRegister({ ...dataRegister, email: e.target.value })} className="email-field" placeholder="Email" />
							<input type="password" onChange={e => setDataRegister({ ...dataRegister, password: e.target.value })} className="password-field" placeholder="Password" />
							<div className="btn-login">
								<ButtonCustom onClick={() => register()} text={'Sign In'} />
							</div>
							<p className='d-flex justify-content-around'>
								<span onClick={() => setmode('signin')}>SignIn</span>
								<span>Forgot password</span>
							</p>
						</form>
					</Modal.Body>
				</Modal>
			</Container >
		</div>
	)
}
