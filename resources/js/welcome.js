import React, {Component} from 'react';
import '../css/app.css';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';

class Welcome extends Component {
    render() {
        return (
			<div>
				{/* <Home/> */}
				<Shop/>
			</div>
        );
    }
}

export default Welcome;
