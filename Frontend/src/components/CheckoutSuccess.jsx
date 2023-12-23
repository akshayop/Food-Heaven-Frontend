import React from "react";
import styles from "../styles/checkoutSuccess.module.css";
import { paymentSuccess } from "../assets";
import { motion } from "framer-motion";
import { btnClick, slideIn } from "../animation";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <>
      <div className={styles.successContainer}>
        <div className={styles.imageWrapper}>
          <img src={paymentSuccess} alt="Payment success" />
        </div>
        <motion.h1 { ...slideIn }>Your Payment is Successful!</motion.h1>

        <motion.div {...btnClick}>
          <NavLink to={"/"}  className={styles.homeBtn}>
            <FaArrowLeft />
            <p> Go To Home </p>
          </NavLink>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
