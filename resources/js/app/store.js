import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/card/cardSlice'
import listbookReducer from '../features/shop/listbookSlice'

export default configureStore({
	reducer: {
		cardReducer: cardReducer,
		listbookReducer: listbookReducer
	}
})