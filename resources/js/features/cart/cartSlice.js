import { createSlice } from '@reduxjs/toolkit'
import { ModalTitle } from 'react-bootstrap'

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: []
	},
	reducers: {
		addToCard: (state, action) => {
			let flag = true
			state.cart = state.cart.map((ele, idx) => {
				if (ele.book_id === action.payload.book_id) {
					flag = false
					return (ele.quantity + action.payload.quantity) > 8 ?
						{ ...ele, quantity: 8 }
						: {
							...ele, quantity: action.payload.quantity + ele.quantity
						}
				}
				else {
					return ele
				}
			})
			if (flag) {
				state.cart = [...state.cart, action.payload]
			}
		},
		changeQuantityItem: (state, action) => {
			state.cart = state.cart.map((ele, idx) => {
				if (ele.book_id === action.payload.book_id) {
					return { ...ele, ...action.payload }
				}
				else {
					return ele
				}
			})
		}
	}
})

// Action creators are generated for each case reducer function
export const { addToCard, changeQuantityItem } = cartSlice.actions

export default cartSlice.reducer