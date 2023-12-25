import React, { useEffect } from "react";
import styles from "../styles/order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersDetails } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { OrderDetails } from "./";

export default function DashboardOrders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders) {
      getOrdersDetails().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        {orders ? (
          <>
            <h1>Order List</h1>
            <div className={styles.listContainer}>
              {orders.map((item, i) => (
                <OrderDetails key={i}  data={item} index={i} admin={true}  />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>No data</h1>
          </>
        )}
      </div>
    </>
  );
}
