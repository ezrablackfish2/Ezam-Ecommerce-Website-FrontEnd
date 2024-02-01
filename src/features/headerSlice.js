import { createSlice } from "@reduxjs/toolkit"



const headerSlice = createSlice({
	name: "headers",
	initialState: {
		searchOn: false,
		categoriesOn: false,
		cartOn: false,
		menuOn: false,
		hoveredCategory: [],

	},
	reducers: {
		
		setSearchOn: (state, action) => {
			state.searchOn = action.payload;
		},
		setCategoriesOn: (state,action) => {
			state.categoriesOn = action.payload;	
		},
		setHoveredCategory: (state,action) => {
			state.hoveredCategory = action.payload;	
		},
		setCartOn: (state,action) => {
			state.cartOn = action.payload;	
		},
		setMenuOn: (state, action) => {
			state.menuOn = action.payload;
		},


	}
});

export const setSearchOn = headerSlice.actions.setSearchOn;
export const setCategoriesOn = headerSlice.actions.setCategoriesOn;
export const setHoveredCategory = headerSlice.actions.setHoveredCategory;
export const setCartOn = headerSlice.actions.setCartOn;
export const setMenuOn = headerSlice.actions.setMenuOn;
export default headerSlice.reducer;
