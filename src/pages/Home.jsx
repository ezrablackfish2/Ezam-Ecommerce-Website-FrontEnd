import styles from "../components/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";
import { useEffect } from "react";
import FetchProduct from "../fetch/product";
import ezra from "../public/ezra.jpg";
import amanuel from "../public/amanuel.webp";

function Home() {
	const dispatch = useDispatch();
	const products = useSelector(state => state.products.productsData);
	FetchProduct();

	return(
		<div className={styles.home}>
		<div className={styles.promotion}>Unlock premium products at unbeatable prices! Shop now at EZam Ecommerce for high-quality goods without breaking the bank</div>
		<div className={styles.category}>
		<div className={styles.categoryTitle}>
		<span className={styles.storeText}>Shop. </span> ultimate destination for purchasing items you adore.
		</div>
		<div className={styles.specialist}>
		<img
			className={styles.specialistImage}
			src={ezra}
		/>
		<img
			className={styles.specialistImage}
			src={amanuel}
		/>

		<div className={styles.upperSpecialistText}>
		Need shopping help?
		</div>
		<div className={styles.lowerSpecialistText}>
		<a className={styles.specialistLink} href="#">
		Ask Owners
		</a>
		</div>
		</div>
		</div>
            	    {products.map((product, index) => (
			<div key={product.id}>
            	        <div> Name {product.name}</div>
            	        <div> Price {product.price}</div>
			</div>
            	    ))}
            	</div>
	)
}

export default Home;
