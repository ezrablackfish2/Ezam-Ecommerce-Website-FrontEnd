import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import styles from "../components/Form.module.css";
import style from "../components/List.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function ProfileScreen() {
	const history = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
    return (
        <div class="row">
    <div  className={styles.totalForm}>
        <h2 className={styles.formTitle}>User Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>

            <div class="form-group" controlId='name'>
                <label className={styles.label} for='name'>Name</label>
                <input
		    className={styles.input}
                    required
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div class="form-group" controlId='email'>
                <label className={styles.label} for='email'>Email Address</label>
                <input
	            className={styles.input}
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div class="form-group" controlId='password'>
                <label className={styles.label} for='password'>Password</label>
                <input
		    className={styles.input}
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div class="form-group" controlId='passwordConfirm'>
                <label className={styles.label} for='passwordConfirm'>Confirm Password</label>
                <input
	            className={styles.input}
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button className={styles.Button} type='submit' class="btn btn-primary">
                Update
            </button>

        </form>
    </div>

    <div className={style.lister}>
        <h2 className={style.tableTitle}>My Orders</h2>
        {loadingOrders ? (
            <div class="loader"></div>
        ) : errorOrders ? (
            <div class="message error">{errorOrders}</div>
        ) : (
                    <table className={style.table} table-striped table-responsive>
                        <thead>
                            <tr>
                                <th className={style.cell}>ID</th>
                                <th className={style.cell}>Date</th>
                                <th className={style.cell}>Total</th>
                                <th className={style.cell}>Paid</th>
                                <th className={style.cell}>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className={style.cell}>{order._id}</td>
                                    <td className={style.cell}>{order.createdAt.substring(0, 10)}</td>
                                    <td className={style.cell}>{order.totalPrice} Birr</td>
                                    <td className={style.cell}>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <FontAwesomeIcon icon={faXmark} color="red" />
                                    )}</td>
                                    <td className={style.cell}>
                                        <a className={styles.link} href={`/order/${order._id}`} class='btn btn-sm'>Details</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
    </div>
</div>
    )
}

export default ProfileScreen
