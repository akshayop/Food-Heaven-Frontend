import React, { useState } from "react";
import styles from "../styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Cart, Dishes, ItemCard } from "./";
// import { getProducts } from "../api";
// import { setAllProducts } from "../context/actions/productAction";

const HomeFooter = () => {
  const products = useSelector((state) => state.product);

  // const dispatch = useDispatch();
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    // if (!products) {
    //   getProducts().then((data) => {
    //     dispatch(setAllProducts(data));
    //   });
    // }
    setFruits(products?.filter((data) => data.product_category === "fruits"));
  }, [products]);

  return (
    <>
      <div className={styles.homeFooterContainer}>
        <div>
          <div className={styles.footerWrapper}>
            <p>Fresh & Healthy Fruits</p>
            <div className={styles.dashWrapper}></div>
          </div>

          <div className={styles.fruitsWrap}>
            {fruits &&
              fruits.map((data, i) => (
                <ItemCard key={i} data={data} index={i} />
              ))}
          </div>

          <div>
            <Dishes />
          </div>
        </div>

        
      </div>
    </>
  );
};

export default HomeFooter;
