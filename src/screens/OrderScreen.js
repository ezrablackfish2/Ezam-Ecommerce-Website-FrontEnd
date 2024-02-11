import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import styles from "../components/Cart.module.css";


function OrderScreen({ match }) {
	const history = useNavigate();
	const { id } = useParams();
    const orderId = id;
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

	document.title = "Order";

    useEffect(() => {

        if (!userInfo) {
            history('/login')
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    
return loading ? (
    	<Loader />
) : error ? (
    <div className="message danger">{error}</div>
) : (
    <div className={styles.cart}>
        <h1>Order: {order.Id}</h1>
        <div>
            <div className={styles.cartObjects}>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong><a className={styles.backLink} href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {'  '}
                            {order.shippingAddress.postalCode},
                            {'  '}
                            {order.shippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <div className="message success">Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="message warning">Not Delivered</div>
                        )}
                    </li>

                    <li className="list-group-item">
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="message success">Paid on {order.paidAt}</div>
                        ) : (
                            <div className="message warning">Not Paid</div>
                        )}

                    </li>

                    <li className="list-group-item">
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <div className="message info">
                            Order is empty
                        </div> : (
                            <ul className="list-group">
                                {order.orderItems.map((item, index) => (
                                    <li className={styles.cartItems} key={index}>
                                        <div className={styles.cartItem}>
                                            <div className={styles.cartImage}>
                                                <img src={`https://ezam-ecommerce.onrender.com/${item.image}`} alt={item.name}  className={styles.cartImageImage} />
                                            </div>

                                            <div className={styles.cartPrice}>
                                                <a className={styles.backLink} href={`/product/${item.product}`}>{item.name}</a>
                                            </div>

                                            <div className={styles.cartSelect}>
                                                {item.qty} X {item.price}Birr = {(item.qty * item.price).toFixed(2)} Birr
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                </ul>

            </div>

            <div  className={styles.subTotals}>
                <div className="card">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <h2 className={styles.order}>Order Summary</h2>
                        </li>

                        <li className="list-group-item">
                            <div className="row">
                                <div className={styles.cartName}>Items:</div>
                                <div className={styles.cartName}>{order.itemsPrice} Birr</div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="row">
                                <div className={styles.cartName}>Shipping:</div>
                                <div className={styles.cartName}>{order.shippingPrice} Birr</div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="row">
                                <div className={styles.cartName}>Tax:</div>
                                <div className={styles.cartName}>{order.taxPrice} Birr</div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="row">
                                <div className={styles.cartName}>Total:</div>
                                <div className={styles.cartName}>{order.totalPrice} Birr</div>
                            </div>
                        </li>


                        {!order.isPaid && (
                                        <div className={styles.paypal}>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
						    	className={styles.paypal}
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </div>
                        )}
                    </ul>
                    {loadingDeliver && <div className="loader">Loading...</div>}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <li className="list-group-item">
                            <button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </button>
                        </li>
                    )}
                </div>
            </div>
        </div>
    </div>
);

}

export default OrderScreen
