import React, { useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import { profileImg } from "../assets";
import { DataTable } from "./";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";


export default function DashboardUsers() {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
        dispatch(setAllUserDetails(data));
      });
    }
  }, [allUsers]);

  return (
    <>
      <div className={styles.dbItemsContainer}>
        <DataTable
          columns={[
            {
              title: "Image",
              field: "photoURL",
              render: (rowData) => (
                <div className={styles.imgWrapper}>
                  <img src={rowData.photoURL ? rowData.photoURL : profileImg} />
                </div>
              ),
            },
            {
              title: "Name",
              field: "displayName",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Verified",
              field: "emailVerified",
              render: (rowData) => (
                <p
                  className={
                    rowData.emailVerified
                      ? styles.verifiedWrapper
                      : styles.notVerifiedWrapper
                  }
                >
                  {rowData.emailVerified ? "Verified" : "Not Verified"}
                </p>
              ),
            },
          ]}
          data={allUsers || []}
          title="Users List"
          //   actions={[
          //     {
          //       icon: "edit",
          //       tooltip: "Edit Data",
          //       onClick: (event, rowData) => {
          //         alert("You want do edit " + rowData.product_id);
          //       },
          //     },
          //     {
          //       icon: "delete",
          //       tooltip: "Delete Data",
          //       onClick: (event, rowData) => {
          //         if (
          //           window.confirm("Are you sure you want to perform this action")
          //         ) {
          //           deleteProducts(rowData.product_id).then(() => {
          //             toast.success("Product Deleted");
          //             getProducts().then((data) => {
          //               dispatch(setAllProducts(data));
          //             });
          //           });
          //         }
          //       },
          //     },
          //   ]}
        />
      </div>
    </>
  );
}
