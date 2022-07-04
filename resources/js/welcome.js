import React, { Component } from 'react';
import {
	Routes,
	Route,
} from "react-router-dom";
import About from './pages/About/About';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';

import '../css/app.css';
class Welcome extends Component {
	render() {
		return (
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/about" element={<About />} />
			</Routes>
		);
	}
}

export default Welcome;
