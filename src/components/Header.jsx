import styles from "./Header.module.css";
import logo from "../public/logo.png";
import search from "../public/search.png";
import cart from "../public/cart.png";


const Header = () => {
	const categories = ["Electronics", "Apparel", "Kitchen", "Beauty", "Outdoors", "Health", "Books", "Toys", "Automotive", "Construction" ]
	return (
        <div className={styles.header}>
            <div className={styles.categories}>
                <img
                    className={styles.logo}
                    src={logo}
                    alt="Logo"
                />
                {categories.map((category) => (
                    <div className={styles.category} key={category}>{category}</div>
                ))}
		<div className={styles.category}>supprt</div>
		<div className={styles.category}>
		<img
                    className={styles.categoryImage}
                    src={search}
                    alt="Logo"
                />
		</div>
		<div className={styles.category}>
		<img
                    className={styles.categoryImage}
                    src={cart}
                    alt="Logo"
                />
		</div>
            </div>
        </div>
    	);
};

export default Header;
