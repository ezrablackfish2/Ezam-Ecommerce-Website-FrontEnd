import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import { useNavigate } from "react-router-dom";
import styles from "../components/List.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function UserListScreen() {

	const history = useNavigate();
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history('/login')
        }

    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className={styles.lister}>
            <h1 className={styles.tableTitle}>Users</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table className={styles.table} striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th className={styles.cell}>ID</th>
                                    <th className={styles.cell}>NAME</th>
                                    <th className={styles.cell}>EMAIL</th>
                                    <th className={styles.cell}>ADMIN</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className={styles.cell}>{user._id}</td>
                                        <td className={styles.cell}>{user.name}</td>
                                        <td className={styles.cell}>{user.email}</td>
                                        <td className={styles.cell}>{user.isAdmin ? (
                                            <FontAwesomeIcon icon={faCheck} color="green"/>
                                        ) : (
                                                <FontAwesomeIcon icon={faXmark} color="red" />
                                            )}</td>

                                        <td className={styles.cell}>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <button 
						variant='light' 
						className={styles.editButton}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </LinkContainer>

                                            <button
						className={styles.removeButton}
						variant='danger' 
						onClick={() => deleteHandler(user._id)}>
                                                <FontAwesomeIcon className={styles.icon} icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen
