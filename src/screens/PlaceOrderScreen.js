import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import styles from "../components/Cart.module.css";


function PlaceOrderScreen() {

	const history = useNavigate();

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    if (!cart.paymentMethod) {
        history('/payment')
    }

    useEffect(() => {
        if (success) {
            history(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

	document.title = "Place Order";

    
return (
	<>
	<div className="checkout-steps">
      <CheckoutSteps step1 step2 step3 step4 />
    </div>
  <div className={styles.cart}>
    
    <div className={styles.cartObjects}>
        <ul className="list-group">
          <li className="list-group-item">
            <h2>Shipping</h2>
            <p>
              <strong>Shipping: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </li>
          <li className="list-group-item">
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </li>
          <li className="list-group-item">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="list-group">
                {cart.cartItems.map((item, index) => (
                  <li className={styles.cartItems} key={index}>
                    <div className={styles.cartItem}>
                      <div className={styles.cartImage}>
                        <img src={`https://ezam-ecommerce.onrender.com/${item.image}`} alt={item.name} className={styles.cartImageImage} />
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
      <div className={styles.subTotals}>
        <div className="card">
          <ul className="list-group">
            <li className="list-group-item">
              <div className={styles.order}>Order Summary</div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className={styles.cartName}>Items:</div>
                <div className={styles.cartName}>{cart.itemsPrice} Birr</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className={styles.cartName}>Shipping:</div>
                <div className={styles.cartName}>{cart.shippingPrice} Birr</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className={styles.cartName}>Tax:</div>
                <div className={styles.cartName}>{cart.taxPrice} Birr</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className={styles.cartName}>Total:</div>
                <div className={styles.cartName}>{cart.totalPrice} Birr</div>
              </div>
            </li>
            <li className="list-group-item">
              {error && <p className="text-danger">{error}</p>}
            </li>
            <li className="list-group-item">
              <button
		className={styles.proceedButton}
                type="button"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
  </div>
	</>
);

}

export default PlaceOrderScreen
