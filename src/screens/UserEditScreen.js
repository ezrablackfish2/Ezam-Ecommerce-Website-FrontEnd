import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import styles from "../components/Form.module.css";


function UserEditScreen({ match }) {

	const history = useNavigate();
	const { id } = useParams();
    const userId = id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

	document.title = `${name} edit`

    return (
        <div className={styles.totalForm}>
            <Link className={styles.link} to='/admin/userlist'>
                Go Back
            </Link>

            <div  className="form-container">
                <h1 className={styles.formTitle}>Edit User</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label className={styles.label} htmlFor='name'>Name</label>
                        <input
			className={styles.input}
                        type='text'
                            id='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className={styles.label} htmlFor='email'>Email Address</label>
                        <input
	    		className={styles.input}
                            type='email'
                            id='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className={styles.label} htmlFor='isadmin'>Is Admin</label>
                        <input
	    		className={styles.inputRadio}
                            type='checkbox'
                            id='isadmin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </div>

                    <button 
	    		type='submit' 
	    		className={styles.Button}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserEditScreen
