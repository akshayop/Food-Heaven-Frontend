import React, { useEffect } from "react";
import styles from "../styles/home.module.css";
import { FaShoppingBasket, LiaRupeeSignSolid } from "../assets/icons";
import { motion } from "framer-motion";
import { btnClick, scaleImage } from "../animation";
import { addItemToCart, getItemFromcart } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCartItems } from "../context/actions/cartAction";

const ItemCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const addToCart = () => {
    addItemToCart(user?.user_id, data).then((res) => {
      getItemFromcart(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      toast.success("Added to the cart");
    });
  };

  return (
    <>
      <div className={styles.itemCardContainer}>
        <div className={styles.imgCard}>
          <motion.img
            {...scaleImage}
            src={data.product_image}
            alt="Product image"
          />
        </div>

        <div className={styles.contentCard}>
          <motion.div
            {...btnClick}
            onClick={addToCart}
            className={styles.basketCard}
          >
            <FaShoppingBasket />
          </motion.div>

          <p className={styles.titleCard}>{data.product_name}</p>

          <p className={styles.priceCard}>
            <LiaRupeeSignSolid />
            {parseFloat(data.product_price).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
