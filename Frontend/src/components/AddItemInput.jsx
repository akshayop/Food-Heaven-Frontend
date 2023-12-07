import React from 'react';
import styles from "../styles/dashboard.module.css";

const AddItemInput = ({ type, placeholder, stateValue, stateFunction}) => {
    return (
        <>
            <input 
                className={styles.addItemInputField}
                type={type} 
                placeholder={placeholder}
                value={stateValue}
                onChange={(e) => {
                    stateFunction(e.target.value)
                }}
            />
        </>
    )
}

export default AddItemInput;
