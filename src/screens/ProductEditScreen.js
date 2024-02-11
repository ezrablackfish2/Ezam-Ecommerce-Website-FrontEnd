import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import styles from "../components/Form.module.css";


function ProductEditScreen({ match }) {

    const history = useNavigate();
    const { id } = useParams();
    const productId = id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }



    }, [dispatch, product, productId, history, successUpdate])




    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }


	useEffect(() => {
        const label = document.querySelector('.file-label');
        const inputFile = document.getElementById('image-file');
        
        if (label && inputFile) {
            const handleClick = () => {
                inputFile.click();
            };

            label.addEventListener('click', handleClick);

            return () => {
                label.removeEventListener('click', handleClick);
            };
        }
    }, []);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('https://ezam-ecommerce.onrender.com/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

	document.title = `${product.name} edit`;

    return (
        <div className={styles.totalForm}>
            <Link className={styles.link} to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1 className={styles.formTitle}>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <form onSubmit={submitHandler}>

                                <label className={styles.label}>Name</label>
                                <input
				    className={styles.input}
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <label className={styles.label}>Price</label>
                                <input
                                    className={styles.input}
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />


                                <label className={styles.label}>Image</label>
                                <input
				    className={styles.input}
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />

                                <input
			    	 className={styles.input}
			    	    type="file"
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                />
			        <label htmlFor="image-file" className={styles.fileLabel}>Choose File</label>

                                {uploading && <Loader />}



                                <label className={styles.label}>Brand</label>
                                <input
				 className={styles.input}
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />

                                <label className={styles.label}>Stock</label>
                                <input
				 className={styles.input}
                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />

                                <label className={styles.label}>Category</label>
                                <input
				 className={styles.input}
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />

                                <label className={styles.label}>Description</label>
                                <input
				 className={styles.input}
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />


                            <button  
			    className={styles.Button} 
			    type='submit' 
			    variant='primary'>
                                Update
                        </button>

                        </form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen
