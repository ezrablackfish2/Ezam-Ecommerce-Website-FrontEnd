import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import  styles from "../components/Cart.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';





function CartScreen({ match }) {
	const location = useLocation();
    	const history = useNavigate();
	const { id } = useParams();
    	const productId = id;
    	const qty = location.search ? Number(location.search.split('=')[1]) : 1
    	const dispatch = useDispatch()

    	const cart = useSelector(state => state.cart)
    	const { cartItems } = cart
	const userLogin = useSelector(state => state.userLogin)
    	const { userInfo } = userLogin

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
	    userInfo ? 
		    history('/shipping')
	    :
		    history('/login')
    }

    return (
        <div className={styles.cart}>
            <div className={styles.cartObjects}>
                <div className={styles.cartTitle}>Shopping Cart</div>
                {cartItems.length === 0 ? (
                    <div className={styles.emptyText}>
                        Your cart is empty <Link className={styles.backLink} to='/'>Go Back</Link>
                    </div>
                ) : (
                    <div className={styles.cartItems}>
                        {cartItems.map(item => (
                            <div  className={styles.cartItem} key={item.product}>
                                <div className={styles.cartImage}>
                                    <img className={styles.cartImageImage} src={`https://ezam-ecommerce.onrender.com/${item.image}`} alt={item.name} />
                                </div>
                                <div className={styles.cartName}>
                                    <Link className={styles.cartName} to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div className={styles.cartPrice}>
                                    ${item.price}
                                </div>
                                <div className={styles.cartSelect}>
                                    <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                </div>
                                <div className={styles.cartRemove}>
                                    <button
					className={styles.removeButton}
                                        type='button'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <FontAwesomeIcon className={styles.icon} icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.subTotals}>
                <div>
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </div>
                <div>
                    <button
	    		className={styles.proceedButton}
                        type='button'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartScreen
