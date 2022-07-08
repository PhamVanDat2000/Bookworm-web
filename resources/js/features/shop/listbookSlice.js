import { createSlice } from '@reduxjs/toolkit'

export const listbookSlice = createSlice({
	name: 'listbook',
	initialState: {
		listbook: []
	},
	reducers: {
		setListBook: (state, actions) => {
			state.listbook = actions.payload
		},
	}
})

// Action creators are generated for each case reducer function
export const { setListBook } = listbookSlice.actions

export default listbookSlice.reducer