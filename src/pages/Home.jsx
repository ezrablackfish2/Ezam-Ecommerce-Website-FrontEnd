import styles from "../components/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../features/productSlice";
import { setScrollPosition } from "../features/homeSlice";
import { useEffect, useRef } from "react";

import FetchProduct from "../fetch/product";
import ezra from "../public/ezra.jpg";
import amanuel from "../public/amanuel.webp";
import arrowLeft from "../public/right.jpeg";
import arrowRight from "../public/left.jpg";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsData);
  const scrollPosition = useSelector((state) => state.home.scrollPosition);
  FetchProduct();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

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
  const scrollStep = 50; // Adjust this value as needed
  containerRef.current.scrollLeft -= scrollStep;
};

const scrollRight = () => {
  const scrollStep = 50; // Adjust this value as needed
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

  return (
    <div className={styles.home}>
      <div className={styles.promotion}>
        Unlock premium products at unbeatable prices! Shop now at EZam Ecommerce for high-quality goods without breaking the bank
      </div>
      <div className={styles.category}>
        <div className={styles.categoryTitle}>
          <span className={styles.storeText}>Shop. </span> ultimate destination for purchasing items you adore.
        </div>
        <div className={styles.specialist}>
          <img className={styles.specialistImage} src={ezra} alt="Ezra" />
          <img className={styles.specialistImage} src={amanuel} alt="Amanuel" />

          <div className={styles.upperSpecialistText}>Need shopping help?</div>
          <div className={styles.lowerSpecialistText}>
            <a className={styles.specialistLink} href="#">
              Ask Owners
            </a>
          </div>
        </div>
      </div>
	
	  <img className={styles.arrowLeft}src={arrowLeft} alt="Left Arrow" onClick={scrollLeft} />
      <div
        className={styles.categoryImages}
        onWheel={handleMouseWheel}
        ref={containerRef}
      >
        <div className={styles.scrollableImages} ref={contentRef}>
          {[ezra, ezra, ezra, ezra, ezra].map((image, index) => (
            <img
              key={index}
              className={styles.categoryImage}
              src={image}
              alt={`Image ${index}`}
            />
          ))}
        </div>
      </div>
	  <img className={styles.arrowRight} src={arrowRight} alt="Right Arrow" onClick={scrollRight} />
      {products.map((product, index) => (
        <div key={product.id}>
          <div> Name {product.name}</div>
          <div> Price {product.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;

