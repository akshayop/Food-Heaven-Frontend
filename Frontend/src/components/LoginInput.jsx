import React from 'react';
import styles from "../styles/login.module.css";
import { motion } from 'framer-motion';
import { fadeAnimation } from '../animation';

export default function LoginInput({placeHoleder, icon, inputState, inputStateFunc, type, isSignUp}) {
    return (
        <motion.div 
            {...fadeAnimation}
            className={styles.inputField}
        >
            {icon}
            <input 
                type={type} 
                placeholder={placeHoleder} 
                className={styles.input}
                value={inputState} 
                onChange={(e) => inputStateFunc(e.target.value)} 
            />

        </motion.div>
    )
}
