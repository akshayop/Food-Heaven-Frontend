import React from 'react';
import styles from "../styles/dashboard.module.css";
import { profileImg } from '../assets';
import { motion } from "framer-motion"
import { btnClick } from '../animation';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiFillHome, BiSolidUser, GoChecklist, MdOutlineAddShoppingCart, BiSolidFoodMenu  } from '../assets/icons'; 

export default function DashboardLeft() {   
    const user = useSelector(state => state.user); 

    return (

        <>
            <div className={styles.leftSectionContainer}>
                <div className={styles.headercontainer}>
                    <div className={styles.profileImagecont}>
                        <motion.img 
                            {...btnClick}
                            src={user?.picture ? user?.picture : profileImg}
                        />
                    </div>

                    <p>{user?.name ? user?.name : "Unkown"}</p>
                </div>

                <div className={styles.bodyContainer}>
                    <ul>
                        <NavLink 
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            } 
                            to={"/dashboard/home"}
                        >
                            <AiFillHome />
                            <p>Home</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }  
                            to={"/dashboard/orders"}
                        >
                            <GoChecklist />
                            <p>Orders</p>
                        </NavLink>

                        <NavLink className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }  
                            to={"/dashboard/items"}
                        >
                            <BiSolidFoodMenu  />
                            <p>Items</p>
                        </NavLink>

                        <NavLink className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }  
                            to={"/dashboard/add-new-items"}
                        >
                            <MdOutlineAddShoppingCart />
                            <p>Add New Items</p>
                        </NavLink>

                        <NavLink className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }  
                            to={"/dashboard/users"}
                        >
                            <BiSolidUser />
                            <p>Users</p>
                            
                        </NavLink>


                    </ul>
                </div>
            </div>
        </>
    );
}
