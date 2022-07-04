import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import '../css/custom.scss'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
	<BrowserRouter>
		<Welcome />
	</BrowserRouter>,
	document.getElementById('root')
);