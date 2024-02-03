import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
	name: "home",
	initialState: {
		scrollPosition : 0,
		arrows: false,
		currentPage: 1,
	},
	reducers: {
		
		setScrollPosition: (state, action) => {
			state.scrollPosition = action.payload;
		},
		setArrows: (state, action) => {
			state.arrows = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	}
});

export const setScrollPosition = homeSlice.actions.setScrollPosition;
export const setArrows = homeSlice.actions.setArrows;
export const setCurrentPage = homeSlice.actions.setCurrentPage;
export default homeSlice.reducer;
