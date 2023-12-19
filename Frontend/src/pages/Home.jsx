import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/home.module.css";
import { HomeHead, HomeMiddle, HomeFooter, Cart} from "../components";
import { getProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

const Home = () => {
  const products = useSelector((state) => state.product);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if( !products ) {
        getProducts().then((data) => {
            dispatch(setAllProducts(data));
        })
    }
}, [])

  return (
    <>
      <div className={styles.mainContainer}>
        <HomeHead />
        <HomeMiddle />
        <HomeFooter />
      </div>

      {isCart && <Cart />}
    </>
  );
};

export default Home;
