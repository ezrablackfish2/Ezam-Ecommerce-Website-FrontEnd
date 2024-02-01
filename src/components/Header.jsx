import styles from "./Header.module.css";
import logo from "../public/logo3.png";
import search from "../public/search.png";
import cart from "../public/cart.png";
import menu from "../public/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOn } from "../features/headerSlice";
import { setCategoriesOn, setHoveredCategory  } from "../features/headerSlice";
import { useEffect } from "react";


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
  "Construction": ["Power Tools", "Hand Tools", "Building Materials", "Safety Gear", "Hardware"]
};




	const dispatch = useDispatch();
	const searchOn = useSelector(state => state.headers.searchOn);
	const categoriesOn = useSelector(state => state.headers.categoriesOn);
	const hoveredCategory = useSelector(state => state.headers.hoveredCategory);
	console.log(hoveredCategory);

	const handleSearchClick = () => {
        	dispatch(setSearchOn(!searchOn));
	};

    	const handleSearchMouseLeave = () => {
	      if (searchOn) {
        	    dispatch(setSearchOn(false));
        	}
	};
	const handleCategory = (category) => {
        	dispatch(setCategoriesOn(true));
		dispatch(setHoveredCategory(category));

	};
	const handleCategoryMouseLeave = () => {
	      if (categoriesOn) {
        	    dispatch(setCategoriesOn(false));
        	}
	};

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
                {Object.keys(categories).map((category) => (
			<div onMouseEnter={() => handleCategory(category)} className={styles.category} key={category}>{category}</div>
		))}
		<div className={styles.category}>support</div>
		<img
			onClick={handleSearchClick}
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
		className={`${styles.dropDownSearch} ${categoriesOn ? styles.visible : ''}`}
		onMouseLeave={handleCategoryMouseLeave}
		>
		
		{
			categories[hoveredCategory] && categories[hoveredCategory].map((subcategory, index) => (
          <div key={`${index}-${subcategory}`}>{subcategory}</div>
        ))
		}

		<div>
		</div></div>
		
        </div>
    	);
};

export default Header;
