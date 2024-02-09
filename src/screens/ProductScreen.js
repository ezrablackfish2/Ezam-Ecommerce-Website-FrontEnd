import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import styles from "../components/Product.module.css";

function ProductScreen({ match }) {
	const history = useNavigate();
	const { id } = useParams();
    	const productId = id;
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

	


        dispatch(listProductDetails(productId))

    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
        	productId, {
            rating,
            comment
        }
        ))
    }
	console.log(product.name);
	console.log(product.image);

    return (
        <div className={styles.detail}>
            <Link to='/' className={styles.back}>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                                <div className={styles.detailImageContainer}>
                                    <Image className={styles.detailImage} src={`https://ezam-ecommerce.onrender.com/${product.image}`} alt={product.name} fluid />
                                </div>


                                <div className={styles.detailListContainer}>
                                    <div className={styles.detailLists} variant="flush">
                                            <div className={styles.productName}>{product.name}</div>
			    		    <div className={styles.productPrice}>
                                            {product.price} Birr
			    		    </div>
					    
					  <div>
					   <div className={styles.stock}>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                           </div>
                                                    
                                            {product.countInStock > 0 && (
						    <div className={styles.countStock}>
						    
						    <div>

                                                        <div className={styles.quantity}>Quantity</div>
                                                        <div xs='auto' className={styles.selectQContainer}>
                                                <select
						    	    className={styles.selectQuantity}
						            value={qty}
						            onChange={(e) => setQty(e.target.value)}
							        >
					            {[...Array(product.countInStock).keys()].map((x) => (
					                <option 
							    key={x + 1} 
							    value={x + 1}>
							    <div
							    className={styles.selectQuantityEach}
							    >
					                    {x + 1}
							    </div>
					                </option>
						            ))}
						        </select>
                                                        </div>
						    
						    </div>
						    </div>
                                            )}
			    		</div>

			    		<div className={styles.topRating}>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
			    		    </div>
			    			
			    		    
					    <div>
                                            {product.description}
			    		    </div>


                                            <div>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className={styles.bagButton}
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Add to Bag
                                                </Button>
                                            </div>
			    		
                                </div>
                                </div>

                            <div className={styles.bottomDetail}>
                                    <div className={styles.reviewTitle}>Reviews</div>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                        {product.reviews.map((review) => (
                                            <div key={review._id}>
                                                <span className={styles.reviewName}>{review.name}</span>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
						<hr className={styles.hr}/>
                                            </div>
                                        ))}

                                        <div>
                                            <div className={styles.writeTitle}>Write a review</div>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                        <label className={styles.labels}>Rating</label>
                                                        <select
						    	    className={styles.ratingSelector}
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>Poor</option>
                                                            <option value='2'>Fair</option>
                                                            <option value='3'>Good</option>
                                                            <option value='4'>Very Good</option>
                                                            <option value='5'>Excellent</option>
                                                        </select>

                                                        <label className={styles.labels}>Review</label>
                                                        <textarea
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></textarea>

                                                    <Button
						    	className={`${styles.submitButton}`}
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                        </div>
                            </div>
                        </div>
                    )

            }


        </div >
    )
}

export default ProductScreen
