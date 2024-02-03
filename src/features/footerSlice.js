import { createSlice } from "@reduxjs/toolkit"



const headerSlice = createSlice({
	name: "footers",
	initialState: {
		resourceOn: false,
		helpOn: false,
		companyOn: false,

	},
	reducers: {
		
		setResourceOn: (state, action) => {
			state.resourceOn = action.payload;
		},
		setHelpOn: (state, action) => {
			state.helpOn = action.payload;
		},
		setCompanyOn: (state, action) => {
			state.companyOn = action.payload;
		},




	}
});

export const setResourceOn = headerSlice.actions.setResourceOn;
export const setHelpOn = headerSlice.actions.setHelpOn;
export const setCompanyOn = headerSlice.actions.setCompanyOn;
export default headerSlice.reducer;
