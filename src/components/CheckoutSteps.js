import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import styles from "./Checkout.module.css";

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <div className={styles.steps}>
            <div className={styles.step}>
                {step1 ? (
                    <Link className={styles.link} to='/login'>
                        <div>Login</div>
                    </Link>
                ) : (
                        <div disabled>Login</div>
                    )}
            </div>

            <div className={styles.step}>
                {step2 ? (
                    <Link className={styles.link} to='/shipping'>
                        <div>Shipping</div>
                    </Link>
                ) : (
                        <div disabled>Shipping</div>
                    )}
            </div>

            <div className={styles.step}>
                {step3 ? (
                    <Link className={styles.link} to='/payment'>
                        <div>Payment</div>
                    </Link>
                ) : (
                        <div disabled>Payment</div>
                    )}
            </div>

            <div className={styles.step}>
                {step4 ? (
                    <Link className={styles.link} to='/placeorder'>
                        <div>Place Order</div>
                    </Link>
                ) : (
                        <div disabled>Place Order</div>
                    )}
            </div>
        </div>
    )
}

export default CheckoutSteps
