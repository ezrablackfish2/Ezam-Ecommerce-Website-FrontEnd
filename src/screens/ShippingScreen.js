import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate } from "react-router-dom"
import styles from "../components/Form.module.css"


function ShippingScreen() {

	const history = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history('/payment')
    }

    return (
	    <>
	    <div>
	    <CheckoutSteps step1 step2 />
	    </div>
        <div className={styles.totalForm}>
            <div>
                <div className={styles.formTitle}>Shipping</div>
                <form onSubmit={submitHandler}>

                    <div>
                        <label className={styles.label} htmlFor='address'>Address</label>
                        <input
	    		    className={styles.input}
                            required
                            type='text'
                            id='address'
                            placeholder='Enter address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor='city'>City</label>
                        <input
	    		    className={styles.input}
                            required
                            type='text'
                            id='city'
                            placeholder='Enter city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor='postalCode'>Postal Code</label>
                        <input
	    		    className={styles.input}
                            required
                            type='text'
                            id='postalCode'
                            placeholder='Enter postal code'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
			
	    	    <div className={styles.buttonContainer}>
                    <button className={styles.Button} type='submit'>Continue</button>
	    	    </div>
                </form>
            </div>
        </div>
	    </>
    );}

export default ShippingScreen
