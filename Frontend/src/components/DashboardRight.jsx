import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/dashboard.module.css";
import { useSelector } from 'react-redux';
import { GoSearch, IoNotifications } from '../assets/icons';
import { motion } from 'framer-motion';
import { btnClick } from '../animation';
import { Route, Routes } from 'react-router';
import { DashboardHome, DashboardItems, DashboardNewItem, DashboardOrders, DashboardUsers } from './';

export default function DashboardRight() {
    const user = useSelector(state => state.user); 
    const navigate = useNavigate();

    const RedirePage =  () => {
        useEffect(() => {
            navigate("/dashboard/home", {replace: true})
        }, []);
    }
    return (
        <>
            <div className={styles.rightSectionContainer}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        <input 
                            type="text"
                            placeholder='search'
                        />

                        <GoSearch   className={styles.searchbtn}  />
                    </div>

                    <motion.div {...btnClick} className={styles.notificationBtn}>
                        <IoNotifications />
                    </motion.div>
                    
                </div>
                
      
                <div>
                    <Routes>
                        <Route exact  path='/home' element={<DashboardHome />}></Route>
                        <Route exact  path='/orders' element={<DashboardOrders />}></Route>
                        <Route exact path='/items' element={<DashboardItems />}></Route>
                        <Route exact path='/add-new-items' element={<DashboardNewItem />}></Route>
                        <Route exact path='/users' element={<DashboardUsers />}></Route>
                        <Route path="*" Component={RedirePage} />
                    </Routes>
                </div>

                
            </div>
            
        </>   
    );
}
