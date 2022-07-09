import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/card/cardSlice'
import listbookReducer from '../features/shop/listbookSlice'
import navbarReducer from '../features/navbar/navbarSlice'

export default configureStore({
	reducer: {
		cardReducer: cardReducer,
		listbookReducer: listbookReducer,
		navbarReducer: navbarReducer
	}
})