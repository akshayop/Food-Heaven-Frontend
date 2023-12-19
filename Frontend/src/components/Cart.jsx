import React, { useEffect, useState } from "react";
import styles from "../styles/cart.module.css";
import { motion } from "framer-motion";
import { btnClick, fadeInOut, scaleImage, slideIn } from "../animation";
import { MdClose, FaMinus, FaPlus, LiaRupeeSignSolid } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../context/actions/getCartAction";
import { toast } from "react-toastify";
import { getItemFromcart, increaseQuantity } from "../api";
import { setCartItems } from "../context/actions/cartAction";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [grandTotal, setGrandTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;

    if (cart) {
      cart.map((data) => {
        total = total + data.product_price * data.quantity;
        setGrandTotal(total);
      });
    }
  }, [cart]);

  return (
    <>
      <motion.div {...slideIn} className={styles.cartContainer}>
        <div className={styles.detailsWrapper}>
          <div>
            <p>Cart Items</p>
            <div className={styles.dashWrapper}></div>
          </div>
          <motion.div
            className={styles.cancel}
            onClick={() => dispatch(setCartOff())}
            {...btnClick}
          >
            <MdClose />
          </motion.div>
        </div>

        <div className={styles.itemsContainer}>
          {cart ? (
            <>
              <div className={styles.cartItemsList}>
                {cart &&
                  cart?.length > 0 &&
                  cart?.map((item, i) => (
                    <CartCard key={i} index={i} data={item} />
                  ))}
              </div>

              <div className={styles.totalContainer}>
                <div className={styles.totalTitle}>
                  <p className={styles.totalText}>Total</p>

                  <p className={styles.totalCardWrapper}>
                    <LiaRupeeSignSolid />
                    {grandTotal}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.emptyCart}> cart is empty</h1>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export const CartCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  const decrementCart = (productId) => {
    increaseQuantity(user?.user_id, productId, "decrement").then((data) => {
      getItemFromcart(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });

      toast.success("Cart item updated.");
    });
  };

  const incrementCart = (productId) => {
    increaseQuantity(user?.user_id, productId, "increment").then((data) => {
      getItemFromcart(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });

      toast.success("Cart item updated.");
    });
  };

  return (
    <motion.div key={index} {...fadeInOut(index)} className={styles.cartCards}>
      <div className={styles.cartWrapper}>
        <div className={styles.cartImg}>
          <motion.img {...scaleImage} src={data?.product_image} alt="" />
        </div>

        <div className={styles.cardTitle}>
          {data?.product_category}

          <span>{data?.product_name}</span>
        </div>
      </div>

      <div className={styles.quantityContainer}>
        <motion.div
          {...btnClick}
          className={styles.decQuantity}
          onClick={() => decrementCart(data?.product_id)}
        >
          <FaMinus />
        </motion.div>

        <p>{data?.quantity}</p>

        <motion.div
          {...btnClick}
          className={styles.incQuantity}
          onClick={() => incrementCart(data?.product_id)}
        >
          <FaPlus />
        </motion.div>
      </div>

      <div className={styles.totalCard}>
        <LiaRupeeSignSolid />
        {itemTotal}
      </div>
    </motion.div>
  );
};

export default Cart;
