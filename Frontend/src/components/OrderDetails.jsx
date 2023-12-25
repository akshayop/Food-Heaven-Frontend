import React from "react";
import styles from "../styles/order.module.css";
import { LiaRupeeSignSolid } from "../assets/icons";
import { motion } from "framer-motion";
import { fadeInOut } from "../animation";
import { getOrdersDetails, updateOrdersStatus } from "../api";
import { useDispatch } from "react-redux";
import { setOrders } from "../context/actions/ordersAction";

const OrderDetails = ({ data, index, admin }) => {

  const dispatch = useDispatch();

  const handleStatus = (orderId, status) => {

    updateOrdersStatus(orderId, status).then(res => {
      getOrdersDetails().then((data) => {
        dispatch(setOrders(data));
      });
    }) 
  };

  return (
    <motion.div {...fadeInOut(index)} className={styles.orderDetailsWrappper}>
      <div className={styles.leftPart}>
        <div className={styles.imageContainer}>
          <img src={data?.items[0].product_image} alt="" />
        </div>

        <div className={styles.rightPart}>
          <p style={{ paddingBottom: "10px" }}>{data?.items[0].product_name}</p>

          <div className={styles.priceList}>
            <p>Qty: {data?.items[0].quantity}</p>

            <p className={styles.price}>
              <LiaRupeeSignSolid />
              {parseFloat(data?.items[0].product_price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.address}>
        <h1>{data?.shipping_details.name}</h1>

        <h5>
          {data?.customer.email} {data?.customer.phone}
        </h5>
        <h5>
          {data?.shipping_details.address.line1},
          {data?.shipping_details.address.line2} <br />
          {data?.shipping_details.address.state},
          {data?.shipping_details.address.country} -
          {data?.shipping_details.address.postal_code}
        </h5>
      </div>

      <div className={styles.endContainer}>
        <p className={styles.price}>
          Total : <LiaRupeeSignSolid />
          <span>{data?.total}</span>
        </p>

        <p className={styles.status}>{data?.status}</p>
      </div>

      <div className={styles.statusContainer}>
        <p
          className={
            data.sts === "preparing"
              ? styles.prepSts
              : data.sts === "cancelled"
              ? styles.cancSts
              : styles.delSts
          }
        >
          {data?.sts}
        </p>

        {admin && (
          <div className={styles.stat}>
            <label>
              Mark as:{" "}
              <select
                name="selectedType"
                onChange={(e) => {
                  handleStatus(data.orderId, e.target.value);
                }}
              >
                <option value="preparing">Preparing</option>
                <option value="cancelled">Cancelled</option>
                <option value="delivered">Delivered</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderDetails;
