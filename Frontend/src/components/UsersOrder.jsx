import React, { useEffect, useState } from "react";
import styles from "../styles/order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersDetails } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { OrderDetails } from "./";

const UsersOrder = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      console.log(user);
      getOrdersDetails().then((data) => {
        console.log(user);
        dispatch(setOrders(data));
        // setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders, user]);

  return (
    <>
      <div className={styles.userContainer}>
        <div className={styles.title}>
          <h1>My Order List</h1>
          <div className={styles.dashWrapper}></div>
        </div>
        <div className={styles.orderListWrapper}>
          {userOrders?.length > 0 ? (
            userOrders.map((item, i) => (
              <OrderDetails key={i} index={i} data={item} admin={false} />
            ))
          ) : (
            <>
              <h1 className={styles.dataNo}>No data</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersOrder;
