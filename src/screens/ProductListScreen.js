import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../components/List.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function ProductListScreen({ match }) {

	const history = useNavigate();
	const location = useLocation();
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history('/login')
        }

        if (successCreate) {
            history(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

	document.title = "Product List";

    return (
        <div className={styles.lister}>
                    <h1 className={styles.tableTitle}>Products</h1>
		    <div className={styles.createContainer}>
                    <Button className={styles.Button} onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
	    	    </div>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table className={styles.table}striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th className={styles.cell}>ID</th>
                                        <th className={styles.cell}>NAME</th>
                                        <th className={styles.cell}>PRICE</th>
                                        <th className={styles.cell}>CATEGORY</th>
                                        <th className={styles.cell}>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td className={styles.cell}>{product._id}</td>
                                            <td className={styles.cell}>{product.name}</td>
                                            <td className={styles.cell}>{product.price} Birr</td>
                                            <td className={styles.cell}>{product.category}</td>
                                            <td className={styles.cell}>{product.brand}</td>

                                            <td className={styles.cell}>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <button variant='light' className={styles.editButton}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                </LinkContainer>

                                                <button variant='danger' className={styles.removeButton} onClick={() => deleteHandler(product._id)}>
                                                    <FontAwesomeIcon className={styles.icon} icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen
