import React from "react";
import styles from "../styles/home.module.css";
import { foodOrdering, foodReceiving, foodWaiting } from "../assets";
import { motion } from "framer-motion";
import { scaleImage } from "../animation";

const HomeMiddle = () => {
  return (
    <>
      <div className={styles.homeMiddleContainer}>
        <h1>Three Easy Steps</h1>

        <div className={styles.imageContainer}>
          <motion.div {...scaleImage} className={styles.imageWraper}>
            <img src={foodOrdering} alt="food ordering" />
            <span>Make an order</span>
          </motion.div>

          <motion.div {...scaleImage} className={styles.imageWraper}>
            <img src={foodWaiting} alt="waiting for food" />
            <span>Wait a while</span>
          </motion.div>

          <motion.div {...scaleImage} className={styles.imageWraper}>
            <img src={foodReceiving} alt="receiving food" />
            <span>Get your food</span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomeMiddle;
