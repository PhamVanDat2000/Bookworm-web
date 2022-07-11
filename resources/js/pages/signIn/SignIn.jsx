import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import ButtonCustom from '../../components/button/ButtonCustom';
import authApi from '../../../api/authApi';

export default function SignIn(props) {
	const { text } = props
	const [dataLogin, setDataLogin] = useState({
		email: '',
		password: '',
	})
	const [dataRegister, setDataRegister] = useState({
		email: '',
		password: '',
		first_name: '',
		last_name: ''
	})
	const [modalShow, setModalShow] = useState(false);
	const [mode, setmode] = useState('signin')

	const login = async () => {
		try {
			const data = await authApi.loginApi(dataLogin)
			console.log('login successfully: ', data);
			localStorage.setItem('logintoken', data.token)
			// setTopBookDiscount(data)
		} catch (error) {
			console.log('Failed to login: ', error)
		}
	}
	const register = async () => {
		try {
			const data = await authApi.registerApi(dataRegister)
			console.log('register successfully: ', data);
		} catch (error) {
			console.log('Failed to register: ', error)
		}
	}

	const handleSubmitLogin = (e) => {
		// e.preventDefault()
		login()
	}
	const handleSubmitRegister = (e) => {
		// e.preventDefault()
		register()
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
						{
							mode === 'signin' ?
								<form onSubmit={(e) => handleSubmitLogin(e)}>
									<h1>Sign In</h1>
									<input type="email" onChange={e => setDataLogin({ ...dataLogin, email: e.target.value })} className="email-field" placeholder="Email" />
									<input type="password" onChange={e => setDataLogin({ ...dataLogin, password: e.target.value })} className="password-field" placeholder="Password" />
									<div className="btn-login" onClick={() => handleSubmitLogin()}>
										<ButtonCustom text={'Sign In'} />
									</div>
									<p className='d-flex justify-content-around'>
										<span onClick={() => setmode('register')}>Register</span>
										<span>Forgot password</span>
									</p>
								</form>
								:
								<form onSubmit={(e) => handleSubmitRegister(e)}>
									<h1>Register</h1>
									<input type="text" onChange={e => setDataRegister({ ...dataRegister, first_name: e.target.value })} className="name-field" placeholder="First name" />
									<input type="text" onChange={e => setDataRegister({ ...dataRegister, last_name: e.target.value })} className="name-field" placeholder="Last name" />
									<input type="email" onChange={e => setDataRegister({ ...dataRegister, email: e.target.value })} className="email-field" placeholder="Email" />
									<input type="password" onChange={e => setDataRegister({ ...dataRegister, password: e.target.value })} className="password-field" placeholder="Password" />
									<div className="btn-login" onClick={() => handleSubmitRegister()}>
										<ButtonCustom text={'Register Account'} />
									</div>
									<p className='d-flex justify-content-around'>
										<span onClick={() => setmode('signin')}>SignIn</span>
										<span>Forgot password</span>
									</p>
								</form>
						}
					</Modal.Body>
				</Modal>

			</Container >
		</>
	)
}
