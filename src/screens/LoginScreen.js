import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import styles from "../components/Form.module.css";


function LoginScreen( ) {
    const location = useLocation();
    const history =  useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
	document.title = "Login";

    return (
        <div className={styles.totalForm}>
            <h1 className={styles.formTitle}>Sign In</h1>
            {error && <div className="error-message">{error}</div>}
            {loading && <Loader />}

            <form onSubmit={submitHandler}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
	    	    className={styles.input}
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className={styles.label} htmlFor="password">Password</label>
                <input
	    	    className={styles.input}
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className={styles.Button} type="submit">Sign In</button>
            </form>

            <div className="py-3">
                <p>New Customer? <a className={styles.link} href={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</a></p>
            </div>
        </div>
    );}

export default LoginScreen
