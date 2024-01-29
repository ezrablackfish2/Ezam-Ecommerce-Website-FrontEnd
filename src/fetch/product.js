import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";

const FetchProduct = () => {
		const dispatch = useDispatch();
		const products = useSelector(state => state.products.productsData);
		const fetcher = async () => {
			const url = "https://api.shavathmart.com/api"
			const resp = await axios(url);
			dispatch(setProductsData(resp.data));
		};
		useEffect(() => {
        		fetcher();
    		}, []);

};

export default FetchProduct;
