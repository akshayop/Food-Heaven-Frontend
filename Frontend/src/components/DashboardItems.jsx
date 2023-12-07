import React, { useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import { DataTable } from "./";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";
import { LiaRupeeSignSolid } from "../assets/icons/";
import { toast } from "react-toastify";

export default function DashboardItems() {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      getProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [product]);

  return (
    <>
      {!product ? (
        <>
          <div className={styles.dbItemsContainer}>
            <DataTable
              columns={[
                {
                  title: "Image",
                  field: "product_image",
                },
                {
                  title: "Name",
                  field: "product_name",
                },
                {
                  title: "Category",
                  field: "product_category",
                },
                {
                  title: "Price",
                  field: "product_price",
                  render: (rowData) => (
                    <p>{parseFloat(rowData.product_price).toFixed(2)}</p>
                  ),
                },
              ]}
              title="Product List"
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.dbItemsContainer}>
            <DataTable
              columns={[
                {
                  title: "Image",
                  field: "product_image",
                  render: (rowData) => (
                    <div className={styles.imgWrapper}>
                      <img src={rowData.product_image} />
                    </div>
                  ),
                },
                {
                  title: "Name",
                  field: "product_name",
                },
                {
                  title: "Category",
                  field: "product_category",
                },
                {
                  title: "Price",
                  field: "product_price",
                  render: (rowData) => (
                    <p className={styles.priceWrapper}>
                      <LiaRupeeSignSolid />
                      {parseFloat(rowData.product_price).toFixed(2)}
                    </p>
                  ),
                },
              ]}
              data={product}
              title="Product List"
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit Data",
                  onClick: (event, rowData) => {
                    alert("You want do edit " + rowData.product_id);
                  },
                },
                {
                  icon: "delete",
                  tooltip: "Delete Data",
                  onClick: (event, rowData) => {
                    if (
                      window.confirm(
                        "Are you sure you want to perform this action"
                      )
                    ) {
                      deleteProducts(rowData.product_id).then(() => {
                        toast.success("Product Deleted");
                        getProducts().then((data) => {
                          dispatch(setAllProducts(data));
                        });
                      });
                    }
                  },
                },
              ]}
            />
          </div>
        </>
      )}
    </>
  );
}
