import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../pages/signIn/SignIn';
import Logo from '../../../assets/bookworm_icon.svg'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setItemActive } from '../../features/navbar/navbarSlice';
import { NavDropdown } from 'react-bootstrap';
import authApi from '../../../api/authApi';

function NavBar() {
	let navigate = useNavigate()
	const dispatch = useDispatch()
	let itemActive = useSelector(state => state.navbarReducer.itemActive)
	const handleItemNavbar = (item) => {
		navigate(`/${item}`)
		dispatch(setItemActive(item))
	}
	const [isLogin, setIsLogin] = useState()
	const [nameUser, setNameUser] = useState('')
	useEffect(() => {
		setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
		let currUser = JSON.parse(localStorage.getItem('userLogin'))
		if (currUser) {
			setNameUser(currUser.user.first_name + ' ' + currUser.user.last_name)
		}
	}, [])

	const logout = async () => {
		try {
			const res = await authApi.logoutApi()
			console.log('logout success', res)
			if (res.message === 'Logout success') {
				localStorage.setItem('isLogin', false)
				localStorage.removeItem('userLogin')
				localStorage.removeItem('cart')
				window.location.reload()
			}
		} catch (error) {
			console.log('error', error)
		}
	}
	const handleLogout = () => {
		logout()
	}


	return (
		<Navbar bg="light" expand="lg" sticky='top' className='navbar-container px-4'>
			<Navbar.Brand onClick={() => handleItemNavbar('home')}>
				<img src={Logo} alt="logo for website" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
				<Nav className="ms-auto">
					<Nav.Link
						onClick={() => handleItemNavbar('home')}
						className={itemActive === 'home' ? 'active' : ''}
					>
						Home
					</Nav.Link>
					<Nav.Link
						onClick={() => handleItemNavbar('shop')}
						className={itemActive === 'shop' ? 'active' : ''}>Shop</Nav.Link>
					<Nav.Link
						onClick={() => handleItemNavbar('about')}
						className={itemActive === 'about' ? 'active' : ''}>About</Nav.Link>
					<Nav.Link
						onClick={() => handleItemNavbar('cart')}
						className={itemActive === 'cart' ? 'active' : ''}>Cart</Nav.Link>
					{
						isLogin ?
							<>
								<NavDropdown title={nameUser} id="basic-nav-dropdown">
									<NavDropdown.Item onClick={() => handleLogout()}>LogOut</NavDropdown.Item>
								</NavDropdown>
							</>
							:
							<Nav.Link ><SignIn text={'Sign In'} /></Nav.Link>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar >
	)
}
export default NavBar;