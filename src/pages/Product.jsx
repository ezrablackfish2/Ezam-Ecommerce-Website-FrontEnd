import styles from "../components/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";

const Product = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.productsData);

	console.log("products", products);
	return (
		<div>Product Page</div>
	);
};

export default Product;
