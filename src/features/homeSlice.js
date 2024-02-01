import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
	name: "home",
	initialState: {
		scrollPosition : 0,
		arrows: false,
	},
	reducers: {
		
		setScrollPosition: (state, action) => {
			state.scrollPosition = action.payload;
		},
		setArrows: (state, action) => {
			state.arrows = action.payload;
		},
	}
});

export const setScrollPosition = homeSlice.actions.setScrollPosition;
export const setArrows = homeSlice.actions.setArrows;
export default homeSlice.reducer;
