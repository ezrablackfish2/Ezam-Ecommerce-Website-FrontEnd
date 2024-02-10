import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'
import { useNavigate } from "react-router-dom";
import styles from "../components/List.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function OrderListScreen() {
	
    const history = useNavigate();
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        <div className={styles.lister}>
            <h1 className={styles.tableTitle}>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <table className={styles.table} striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th className={styles.cell}>ID</th>
                                    <th className={styles.cell}>USER</th>
                                    <th className={styles.cell}>DATE</th>
                                    <th className={styles.cell}>Total</th>
                                    <th className={styles.cell}>PAID</th>
                                    <th className={styles.cell}>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className={styles.cell}>{order._id}</td>
                                        <td className={styles.cell}>{order.user && order.user.name}</td>
                                        <td className={styles.cell}>{order.createdAt.substring(0, 10)}</td>
                                        <td className={styles.cell}>${order.totalPrice}</td>

                                        <td className={styles.cell}>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <FontAwesomeIcon icon={faXmark} color="red" />
                                            )}
                                        </td>

                                        <td className={styles.cell}>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <FontAwesomeIcon icon={faXmark} color="red" />
                                            )}
                                        </td>

                                        <td className={styles.cell}>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <button variant='light' className={styles.details}>
                                                    Details
                                                </button>
                                            </LinkContainer>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}

export default OrderListScreen
