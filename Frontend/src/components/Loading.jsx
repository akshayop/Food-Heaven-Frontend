import React from "react";
import styles from "../styles/loading.module.css";

const Loading = () => {
  return (
    <>
      <div className={styles.mainLoaderContainer}>
        <h1>Loading......</h1>
        <div className={styles.cooking}>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.area}>
            <div className={styles.sides}>
              <div className={styles.pan}></div>
              <div className={styles.handle}></div>
            </div>
            <div className={styles.pancake}>
              <div className={styles.pastry}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
