import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from "react-router-dom";
import styles from "../components/Form.module.css";


function PaymentScreen() {

	const history = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }

    return (
	    <>
	    <div>
	    <CheckoutSteps step1 step2 step3 />
	    </div>
        <div className={styles.totalForm}>
	    <div className={styles.formTitle}>
	    Payment Method
	    </div>

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className={styles.label}>Select Method</label>
                    <div
	    		className={styles.inputRadio}
	    		>
                        <input
                            type='radio'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal or Credit Card'
                            checked={paymentMethod === 'PayPal or Credit Card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='paypal'>PayPal or Credit Card</label>
                    </div>
                </div>

                <button type='submit' className={styles.Button}>
                    Continue
                </button>
            </form>
        </div>
	    </>
    );
}

export default PaymentScreen
