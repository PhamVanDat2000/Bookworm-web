import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    itemActive:''
  },
  reducers: {
    setItemActive: (state, action) => {
      state.itemActive = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setItemActive } = navbarSlice.actions

export default navbarSlice.reducer