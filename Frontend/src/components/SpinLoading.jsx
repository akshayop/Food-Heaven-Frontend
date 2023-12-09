import React from 'react';
import styles from "../styles/SpinLoading.module.css";

const SpinLoading = () => {
    return (
        <>
            <div className={styles.loadingContainer}>
                <div className={styles.loading}></div>
                <div className={styles.loadingText}>loading</div>
            </div>
        </>
    )
}

export default SpinLoading
