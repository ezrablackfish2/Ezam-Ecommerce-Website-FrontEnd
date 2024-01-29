import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
	name: "products",
	initialState: {
		productsData : [],
	},
	reducers: {
		
		setProductsData: (state, action) => {
			state.productsData = action.payload;
		},
	}
});

export const setProductsData = productSlice.actions.setProductsData;
export default productSlice.reducer;
