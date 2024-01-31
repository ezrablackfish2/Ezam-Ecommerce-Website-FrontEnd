import styles from "./Header.module.css";
import logo from "../public/logo3.png";
import search from "../public/search.png";
import cart from "../public/cart.png";
import menu from "../public/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOn } from "../features/headerSlice";
import { useEffect } from "react";


const Header = () => {
	const categories = ["Electronics", "Apparel", "Kitchen", "Beauty", "Outdoors", "Health", "Books", "Toys", "Automotive", "Construction" ]
	const dispatch = useDispatch();
	const searchOn = useSelector(state => state.headers.searchOn);
	useEffect(() => {
	console.log("search On", searchOn);
	dispatch(setSearchOn(true));
	}, []);
	console.log("search On", searchOn);
	return (
        <div className={styles.header}>
            <div  className={styles.categories}>
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
		<div className={styles.category}>support</div>
		<img
			onClick={() => dispatch(setSearchOn(!searchOn))}
                    className={styles.searchImage}
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
		<div className={`${styles.dropDownSearch} ${searchOn ? styles.hidden : ''}`}>
		<div><img
				
                    className={styles.searchButton}
                    src={search}
                    alt="Search"
                />
		<input id="search" placeholder={`Search ezam`} type="text" className={styles.searchBar} />
			</div></div>
        </div>
    	);
};

export default Header;
