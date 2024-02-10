import React from 'react'
import { Spinner } from 'react-bootstrap'
import loading from "../public/loading.gif";
import styles from "./loading.module.css";

function Loader() {
    return (
	<div className={styles.loading}>
       <img src={loading} className={styles.loadingImage}/> 
	</div>
    )
}

export default Loader
