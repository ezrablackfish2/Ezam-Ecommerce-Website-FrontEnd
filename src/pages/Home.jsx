import styles from "../components/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";
import { setScrollPosition, setArrows } from "../features/homeSlice";
import { setHoveredCategory } from "../features/headerSlice";
import { setCurrentPage } from "../features/homeSlice";
import { useEffect, useRef } from "react";

import FetchProduct from "../fetch/product";
import ezra from "../public/ezra.jpg";
import amanuel from "../public/amanuel.webp";
import arrowLeft from "../public/right.png";
import arrowRight from "../public/left.png";
import electronics from "../public/electronics.png";
import apparel from "../public/apparel.png";
import kitchen from "../public/kitchen.png";
import beauty from "../public/beauty.png";
import outdoors from "../public/outdoors.png";
import health from "../public/health.png";
import books from "../public/books.png";
import toys from "../public/toys.png";
import automotive from "../public/automotive.png";
import construction from "../public/construction.png";
import { listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from "react-router-dom"
import Rating from '../components/Rating'
import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import Message from '../components/Message'


function Home() {
	const location = useLocation();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.productsData);
	const productList = useSelector(state => state.productList)
	const arrows = useSelector((state) => state.home.arrows);
	const scrollPosition = useSelector((state) => state.home.scrollPosition);
	const hoveredCategory = useSelector((state) => state.headers.hoveredCategory);
	const currentPage = useSelector((state) => state.home.currentPage);
	FetchProduct();
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const productsPerPage = 20;
	const { error, loading, page, pages } = productList

	
	let keyword = location.search
	
	useEffect(() => {
        dispatch(listProducts(keyword))

    	}, [dispatch, keyword])


	const categories = [
		    { "category": "Electronics", "image": electronics }, 
		    { "category": "Apparel", "image": apparel }, 
		    { "category": "Kitchen", "image": kitchen }, 
		    { "category": "Beauty", "image": beauty }, 
		    { "category": "Outdoors", "image": outdoors }, 
		    { "category": "Health", "image": health }, 
		    { "category": "Books", "image": books }, 
		    { "category": "Toys", "image": toys }, 
		    { "category": "Automotive", "image": automotive }, 
		    { "category": "Construction", "image": construction }
		];


	const handleMouseWheel = (event) => {
		event.preventDefault();
		const containerWidth = containerRef.current.offsetWidth;
		const contentWidth = contentRef.current.scrollWidth;
		const maxScrollPosition = getMaxScrollPosition();
		const scrollStep = 50;

		let scrollOffset = event.deltaX;

		const newPosition = Math.max(0, Math.min(scrollPosition + scrollOffset, maxScrollPosition));
			if (newPosition !== scrollPosition) {
				scrollOffset = newPosition - scrollPosition;
			}
	
		dispatch(setScrollPosition(newPosition));
		containerRef.current.scrollLeft += scrollOffset;
	};

	const handleScroll = (scrollOffset) => {
		const newPosition = scrollPosition + scrollOffset;
		dispatch(
			setScrollPosition(Math.max(0, Math.min(newPosition, getMaxScrollPosition())))
		);
	};

	const getMaxScrollPosition = () => {
		const containerWidth = containerRef.current.offsetWidth;
		const contentWidth = contentRef.current.scrollWidth;
	return contentWidth - containerWidth;
	};

	const scrollLeft = () => {
		const scrollStep = 50;
		containerRef.current.scrollLeft -= scrollStep;
	};

	const scrollRight = () => {
		const scrollStep = 50;
		containerRef.current.scrollLeft += scrollStep;
	};	

	useEffect(() => {
		const categoryImagesElement = containerRef.current;
		if (categoryImagesElement) {
			categoryImagesElement.addEventListener("wheel", handleMouseWheel);

		return () => {
			categoryImagesElement.removeEventListener("wheel", handleMouseWheel);
			};
		}
	}, [scrollPosition]);


	const totalProducts = products.length;
	const totalPages = Math.ceil(totalProducts / productsPerPage);
	const handlePageChange = (page: any) => {
	    		dispatch(setCurrentPage(page));
		};
	const handleNextPage = () => {
		if (currentPage < totalPages) {
	      		dispatch(setCurrentPage(currentPage + 1));
			}
	  	};
	const handlePrevPage = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
			}
	  	};
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
	const currentProducts = products.slice(startIndex, endIndex);
	document.title = "EZam Ecommerce Website";


	

	return (
	<>
	{productList.loading ? <Loader />
                : productList.error ? <Message variant='danger'>{productList.error}</Message>
                    :
	<div className={styles.home}>
	<div className={styles.promotion}>
		Unlock premium products at unbeatable prices! Shop now at EZam Ecommerce for high-quality goods without breaking the bank
	</div>
	<div className={styles.category}>
		<div className={styles.categoryTitle}>
		<span className={styles.storeText}>Shop. </span> { hoveredCategory.length > 0 ? <span> {hoveredCategory} </span> : <span> Ultimate destination for purchasing items you adore.</span>}
		</div>
		<div className={styles.specialist}>
		<img className={styles.specialistImage} src={ezra} alt="Ezra" />
		<img className={styles.specialistImage} src={amanuel} alt="Amanuel" />

		<div className={styles.upperSpecialistText}>Need shopping help?</div>
		<div className={styles.lowerSpecialistText}>
		<a className={styles.specialistLink} href="mailto:ezrayeneneh1992@gmail.com">
			Ask Owners
		</a>
		</div>
		</div>
	</div>
	
		{	arrows ?
			<img className={styles.arrowLeft}src={arrowLeft} alt="Left Arrow" onClick={scrollRight} />
			:
			<img className={styles.arrowLeftHidden}src="" alt="Left Arrow" onClick={scrollRight} />
		}
	<div
		className={styles.categoryImages}
		onWheel={handleMouseWheel}
		onMouseEnter={() => dispatch(setArrows(true))}
		onMouseLeave={() => dispatch(setArrows(false))}
		ref={containerRef}
	>
	<div className={styles.scrollableImages} ref={contentRef}>
		{
			categories.map((image, index) => (
		<img
		onClick={() => dispatch(setHoveredCategory(image.category))}
		key={index}
		className={styles.categoryImage}
		src={image.image}
		alt={`Image ${index}`}
		/>
		))}
		</div>
	</div>
		{
			arrows ?
			<img className={styles.arrowRight} src={arrowRight} alt="Right Arrow" onClick={scrollLeft} />
			:
			<img className={styles.arrowRightHidden} src={arrowRight} alt="Right Arrow" onClick={scrollLeft} />
		}
	<div className={styles.latest}>
		<div className={styles.latestText}>
			The latest. Take a look at what’s new, right now.
		</div>
		<div className={styles.latestProducts}>
		{
			
			productList.products
				.filter((game) => {
				return hoveredCategory.toLowerCase() === ""
				? game
				: game.category.toLowerCase().includes(hoveredCategory.toLowerCase());
				})
				.map((product, index) => (
		<div className={`${styles.latestProduct} ${index % 2 === 0 ? styles.white : styles.black}`} key={product.id}>
		<a className={styles.latestProductLink} href={`/product/${product._id}`}>
		<div className={styles.productName}>{product.name}</div>
		<div className={styles.productDescription}> {product.description}</div>
		<div className={styles.prodcutPrice}>From {product.price}  Birr</div>
		<div className={styles.imageContainer}>
		<img
			className={styles.productImage}
			src={`https://ezam-ecommerce.onrender.com/${product.image}`}
				/>
		</div>
		<div className={styles.critic}>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
		</a>
		</div>
		))
		}

		</div>
		</div>
		<div className={styles.pagination}>
			<Paginate page={page} pages={pages} keyword={keyword} />
		            { currentPage > 1 && (
				              <button className={styles.prevbutton} onClick={handlePrevPage}>Previous</button>
				            )}
		            { currentPage < totalPages && (
				              <button className={styles.nextbutton} onClick={handleNextPage}>Next</button>
				            )}
		</div>
		</div>
	}
		</>
		);
	}

export default Home;

