import React, { Component } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import About from './pages/About/About';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Product from './pages/product/Product';
import '../css/app.css';
import SignIn from './pages/signIn/SignIn';
class Welcome extends Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/about" element={<About />} />
					<Route path="/product">
						<Route path=":id" element={<Product />}/>
					</Route>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default Welcome;
