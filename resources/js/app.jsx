import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import '../css/custom.scss'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store={store}>
		<Welcome />
	</Provider>,
	document.getElementById('root')
);