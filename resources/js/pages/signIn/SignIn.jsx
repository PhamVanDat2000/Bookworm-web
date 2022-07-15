import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import ButtonCustom from '../../components/button/ButtonCustom';
import authApi from '../../../api/authApi';
import AlertCustom from '../../components/alert/AlertCustom';

export default function SignIn(props) {
	const [modalShow, setModalShow] = useState(false);
	const [mode, setmode] = useState('signin')
	const [variant, setVariant] = useState('')
	const [children, setChildren] = useState('')
	const { text } = props

	const show = props.show || false
	useEffect(() => {
		setModalShow(show)
	}, [show])
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

	const login = async () => {
		try {
			const res = await authApi.loginApi(dataLogin)
			console.log('login successfully: ', res.status);
			if (res.status = 200) {
				localStorage.setItem('userLogin', JSON.stringify(res.data))
				localStorage.setItem('isLogin', true)
				setModalShow(false)
				setVariant('success')
				setChildren('login successful')
				window.location.reload()
			}
		} catch (error) {
			console.log('Failed to login: ', error)
			if (error.response.status === 401) {
				setVariant('danger')
				setChildren('Email or password is incorrect')
			}
			if (error.response.status === 404) {
				setVariant('info')
				setChildren('This email is not registered')
			}
		}
	}
	const register = async () => {
		try {
			const res = await authApi.registerApi(dataRegister)
			if (res.status === 200) {
				console.log('register successfully: ', res);
				setVariant('success')
				setChildren('register successful')
				setModalShow(false)
			} if (res.status = 422) {
				setVariant('success')
				setChildren('register successful')
			}
		} catch (error) {
			console.log('Failed to register: ', error.response.status)
			if (error.response.status === 422) {
				setVariant('danger')
				setChildren('This email already register')
			}
		}
	}

	const handleSubmitLogin = (e) => {
		login()
	}
	const handleSubmitRegister = (e) => {
		register()
	}
	return (
		<>
			<span onClick={() => setModalShow(true)}>
				{text}
			</span>

			{
				variant ?
					<AlertCustom variant={variant} children={children} />
					:
					null
			}
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
