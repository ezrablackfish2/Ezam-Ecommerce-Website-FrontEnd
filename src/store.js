import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import headerSlice from "./features/headerSlice";
import homeSlice from "./features/homeSlice";
import footerSlice from "./features/footerSlice";

export const store = configureStore({
	reducer: {
		products: productSlice,
		headers: headerSlice,
		home: homeSlice,
		footers: footerSlice,
	},
});
