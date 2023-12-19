import React from "react";
import styles from "../styles/home.module.css";
import { chefImage } from "../assets";
import { FaArrowLeft } from "../assets/icons";
import { motion } from "framer-motion";
import { btnClick } from "../animation";

const HomeHead = () => {
  return (
    <>
      <div className={styles.homeHeadWrapper}>
        <div className={styles.leftContainer}>
          <img src={chefImage} alt="chef-image" />
        </div>

        <div className={styles.rightContainer}>
          <h1>
            Best <span>Food Delivery</span> <br /> in Your Home.
          </h1>

          <h6>Easy . Fast . Reliable</h6>
          
          <p>
            {" "}
            Order your foods anytime, We will deliver them to your doorstep very
            quick.
          </p>

          <motion.button {...btnClick} className={styles.orderBtn}>
            <FaArrowLeft />
            <span>Order Now</span>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default HomeHead;
