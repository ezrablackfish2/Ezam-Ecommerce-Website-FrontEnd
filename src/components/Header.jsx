import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategoriesOn, setHoveredCategory, setCartOn, setSearchOn, setMenuOn  } from "../features/headerSlice";
import { useEffect } from "react";

import logo from "../public/logo3.png";
import search from "../public/search.png";
import cart from "../public/cart.png";
import menu from "../public/menu.png";
import order from "../public/order.png";
import user from "../public/user.png";



const Header = () => {
	const categories = {
  "Electronics": ["Smartphones", "Laptops", "Headphones", "Tablets", "Cameras"],
  "Apparel": ["Men's Clothing", "Women's Clothing", "Children's Clothing", "Shoes", "Accessories"],
  "Kitchen": ["Cookware", "Appliances", "Utensils", "Cutlery", "Bakeware"],
  "Beauty": ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"],
  "Outdoors": ["Camping Gear", "Hiking Equipment", "Fishing Supplies", "Outdoor Clothing", "Tents"],
  "Health": ["Vitamins & Supplements", "Fitness Equipment", "Health Monitors", "First Aid", "Oral Care"],
  "Books": ["Fiction", "Non-Fiction", "Children's Books", "Self-Help", "Cookbooks"],
  "Toys": ["Action Figures", "Board Games", "Dolls", "Puzzles", "Educational Toys"],
  "Automotive": ["Car Parts", "Accessories", "Tools", "Car Care", "Electronics"],
  "Construction": ["Power Tools", "Hand Tools", "Building Materials", "Safety Gear", "Hardware"],
  "Support": ["Contact Us", "Help", "About"]
};




	const dispatch = useDispatch();
	const searchOn = useSelector(state => state.headers.searchOn);
	const categoriesOn = useSelector(state => state.headers.categoriesOn);
	const hoveredCategory = useSelector(state => state.headers.hoveredCategory);
	const cartOn = useSelector(state => state.headers.cartOn);
	const menuOn = useSelector(state => state.headers.menuOn);

	const handleSearchClick = () => {
        	dispatch(setCategoriesOn(false));
		dispatch(setCartOn(false));
        	    dispatch(setSearchOn(!searchOn));
	};
	const handleCartClick = () => {
        	dispatch(setCategoriesOn(false));
        	dispatch(setSearchOn(false));
		dispatch(setCartOn(!cartOn));
	};

	const handleMenuClick = () => {
        	dispatch(setCategoriesOn(false));
        	dispatch(setSearchOn(false));
		dispatch(setCartOn(false));
		dispatch(setMenuOn(!menuOn))
	};

    	const handleSearchMouseLeave = () => {
	      if (searchOn) {
        	    dispatch(setSearchOn(false));
        	}
        	dispatch(setCategoriesOn(false));
		dispatch(setCartOn(false));
	};
	const handleCartMouseLeave = () => {
	      if (searchOn) {
        	    dispatch(setSearchOn(false));
        	}
		dispatch(setCartOn(false));
        	dispatch(setCategoriesOn(false));
	};
	const handleCategory = (category) => {
        	dispatch(setCategoriesOn(true));
		dispatch(setHoveredCategory(category));
        	dispatch(setSearchOn(false));
		dispatch(setCartOn(false));

	};
	const handleCategoryMouseLeave = () => {
	      if (categoriesOn) {
        	    dispatch(setCategoriesOn(false));
        	}
        	    dispatch(setSearchOn(false));
		    dispatch(setCartOn(false));
	};
	const handleMenuMouseLeave = () => {
	      if (categoriesOn) {
        	    dispatch(setCategoriesOn(false));
        	}
        	    dispatch(setSearchOn(false));
		    dispatch(setCartOn(false));
		    dispatch(setMenuOn(false));
	};

	return (
        <div className={`${styles.header} ${searchOn || categoriesOn ? styles.white : ''}`}>
            <div className={styles.categories}>
		<a href="/">
                <img
		    onMouseEnter={handleCategoryMouseLeave}
                    className={styles.logo}
                    src={logo}
                    alt="Logo"
                />
		</a>
                {Object.keys(categories).map((category) => (
			<div onMouseEnter={() => handleCategory(category)} className={styles.category} key={category}>{category}</div>
		))}
		<img
	            onMouseEnter={handleCategoryMouseLeave}
		    onClick={handleSearchClick}
                    className={styles.searchImage}
                    src={search}
                    alt="Search"
                />
		
		<img
		    onMouseEnter={handleCartMouseLeave}
		    onClick={handleCartClick}	
                    className={styles.cartImage}
                    src={cart}
                    alt="Cart"
                />
		<img
			onMouseEnter={handleCartMouseLeave}
		    	onClick={handleMenuClick}	
			className={styles.menuImage}
			src={menu}
		 	alt="Menu"
		/>
            </div>
		<div 
		className={`${styles.dropDownSearch} ${searchOn ? styles.visible : ''}`}
		onMouseLeave={handleSearchMouseLeave}
		>
		<div><img		
                    className={styles.searchButton}
                    src={search}
                    alt="Search"
                />
		<input id="search" placeholder={`Search ezam`} type="text" className={styles.searchBar} />
		</div></div>

		<div 
		className={`${styles.dropDownSearch} ${cartOn ? styles.visible : ''}`}
		onMouseLeave={handleSearchMouseLeave}
		>
		<div className={styles.cart}>
		Your Bag is Empty
		</div>
		<div className={styles.cartDetails}>
		<div className={styles.cart1}>
		sign in to see what you have got
		</div>
		<div className={styles.cart2}> My porfile
		<div className={styles.cart2}>
		<img
			className={styles.cartImages}
			src={order}>
		</img>
		<div className={styles.cartTexts}>
			Orders
		</div>
		</div>
		<div className={styles.cart2}>
		<img
			className={styles.cartImages}
			src={user}>
		</img>
		<div className={styles.cartTexts}>
			Sign In
		</div>
		</div>
		</div>
		</div>
		</div>
		<div 
		className={`${styles.dropDownSearch} ${categoriesOn ? styles.visible : ''}`}
		onMouseLeave={handleCategoryMouseLeave}
		>
		
		{
			categories[hoveredCategory] && categories[hoveredCategory].map((subcategory, index) => (
          <div key={`${index}-${subcategory}`} className={styles.subcategory}>{subcategory}</div>
        ))
		}

		</div>
		<div 
		className={`${styles.dropDownSearch} ${menuOn ? styles.menu : ''}`}
		onMouseLeave={handleMenuMouseLeave}
		>
		
		{Object.keys(categories).map((category) => (
			<div onMouseEnter={() => handleCategory(category)} className={styles.menuCategory} key={category}>{category}</div>
		))}

		</div>
		
        </div>
    	);
};

export default Header;
