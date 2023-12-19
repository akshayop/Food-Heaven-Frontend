import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

export default function DashboardHome() {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      getProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <>
      <div>DashBoard</div>
    </>
  );
}
