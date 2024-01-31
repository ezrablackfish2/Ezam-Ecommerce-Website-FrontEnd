import { createSlice } from "@reduxjs/toolkit"



const headerSlice = createSlice({
	name: "headers",
	initialState: {
		searchOn: true

	},
	reducers: {
		
		setSearchOn: (state, action) => {
			state.searchOn = action.payload;
		},
	}
});

export const setSearchOn = headerSlice.actions.setSearchOn;
export default headerSlice.reducer;
