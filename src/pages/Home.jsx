import styles from "../components/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";
import { useEffect } from "react";
import FetchProduct from "../fetch/product";

function Home() {
	const dispatch = useDispatch();
	const products = useSelector(state => state.products.productsData);
	FetchProduct();

	console.log(products);
	return(
	<>
		<div>Home Page Of Ezam website </div>
		<div>
            	    {products.map((product, index) => (
			<div key={product.id}>
            	        <div> Name {product.name}</div>
            	        <div> Price {product.price}</div>
			</div>
            	    ))}
            	</div>
	</>
	)
}

export default Home;
