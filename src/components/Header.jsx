import styles from "./Header.module.css";
import logo from "../public/logo3.png";
import search from "../public/search.png";
import cart from "../public/cart.png";
import menu from "../public/menu.png";

const Header = () => {
	const categories = ["Electronics", "Apparel", "Kitchen", "Beauty", "Outdoors", "Health", "Books", "Toys", "Automotive", "Construction" ]
	return (
        <div className={styles.header}>
            <div className={styles.categories}>
		<a href="/">
                <img
                    className={styles.logo}
                    src={logo}
                    alt="Logo"
                />
		</a>
                {categories.map((category) => (
                    <div className={styles.category} key={category}>{category}</div>
                ))}
		<div className={styles.category}>supprt</div>
		<img
                    className={styles.logoImage}
                    src={search}
                    alt="Search"
                />
		<img
                    className={styles.cartImage}
                    src={cart}
                    alt="Cart"
                />
		<img
			className={styles.menuImage}
			src={menu}
		 	alt="Menu"
		/>
            </div>
        </div>
    	);
};

export default Header;
