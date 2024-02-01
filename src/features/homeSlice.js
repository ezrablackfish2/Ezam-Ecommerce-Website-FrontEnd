import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
	name: "home",
	initialState: {
		scrollPosition : 0,
	},
	reducers: {
		
		setScrollPosition: (state, action) => {
			state.productsData = action.payload;
		},
	}
});

export const setScrollPosition = homeSlice.actions.setScrollPosition;
export default homeSlice.reducer;
