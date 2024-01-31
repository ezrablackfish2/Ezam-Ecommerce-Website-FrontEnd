import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import headerSlice from "./features/headerSlice";

export const store = configureStore({
	reducer: {
		products: productSlice,
		headers: headerSlice,
	},
});
