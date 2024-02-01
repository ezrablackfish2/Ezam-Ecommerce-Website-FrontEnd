import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import headerSlice from "./features/headerSlice";
import homeSlice from "./features/homeSlice";

export const store = configureStore({
	reducer: {
		products: productSlice,
		headers: headerSlice,
		home: homeSlice,
	},
});
