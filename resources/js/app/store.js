import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import listbookReducer from '../features/shop/listbookSlice'
import navbarReducer from '../features/navbar/navbarSlice'

export default configureStore({
	reducer: {
		cartReducer: cartReducer,
		listbookReducer: listbookReducer,
		navbarReducer: navbarReducer
	}
})