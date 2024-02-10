import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import styles from "../components/Form.module.css";


function RegisterScreen() {
    const location = useLocation();
    const history = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <div className={styles.totalForm}>
            <h1 className={styles.formTitle}>Sign Up</h1>
            {message && <div className="error-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            {loading && <Loader />}

            <form onSubmit={submitHandler}>
                <label className={styles.label}  htmlFor="name">Name</label>
                <input
		    className={styles.input}	
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className={styles.label}  htmlFor="email">Email Address</label>
                <input
	            className={styles.input}
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className={styles.label}  htmlFor="password">Password</label>
                <input
	            className={styles.input}
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className={styles.label}  htmlFor="passwordConfirm">Confirm Password</label>
                <input
	            className={styles.input}
                    type="password"
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
	    	    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button className={styles.Button}  type="submit">Sign Up</button>
            </form>
        </div>
    );}

export default RegisterScreen
