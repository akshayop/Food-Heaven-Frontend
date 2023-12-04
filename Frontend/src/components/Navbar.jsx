import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { websiteLogo } from "../assets";
import { motion } from "framer-motion";
import { FaCartPlus, LuLogIn, LuLogOut } from "../assets/icons";
import { btnClick, landingPage } from "../animation"
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "@firebase/auth";
import { app } from "../config/firebase.config";
import { setUserDetailsAsNull } from "../context/actions/userAction";
import { profileImg } from "../assets"



export default function Navbar() {

    const user = useSelector(state => state.user);
    const [menu, setMenu] = useState(false);
    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handlinglogout = () => {

        auth.signOut().then( () => {
            dispatch(setUserDetailsAsNull())
            navigate("/", {replace: true})
        }).catch((err) => {
            console.log("error", err);
        })
    }

    return (
        <>
            <div className={styles.mainContainer}>
                {/* Website Logo */}

                <NavLink to={"/"}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                            <img src={websiteLogo} alt="logo" />
                            <p>Food Heavn</p>
                        </div>
                    </div>
                </NavLink>

                <nav>
                    <ul className={styles.menuNav}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }
                            to={"/"}
                        >
                            Home
                        </NavLink>
                        
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }
                            to={"/menu"}
                        >
                            Menu
                        </NavLink>
                        
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }
                            to={"/services"}
                        >
                            Servies
                        </NavLink>
                        
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.tabIsActive : styles.tabIsNotActive
                            }
                            to={"/about-us"}
                        >
                            About Us
                        </NavLink>
                    </ul>

                    <motion.div className={styles.cartBtn} {...btnClick}>
                        <FaCartPlus />
                        <div className={styles.cartCount}>
                            <p>5</p>
                        </div>

                    </motion.div>

                    

                    {user ? (
                        <>
                            <div 
                                className={styles.profileContainer} 
                                onMouseEnter={() => setMenu(true)}        
                            >
                                <div className={styles.profileImage}>
                                    <motion.img 
                                        whileHover={{scale:1.17}}
                                        src={user?.picture ? user?.picture : profileImg } 
                                        referrerPolicy="no-referrer"
                                        alt="profile image"
                                    />

                                </div>

                                { menu && (
                                    <motion.div 
                                        className={styles.profileNav} 
                                        onMouseLeave={() => setMenu(false)}
                                        {...landingPage}
                                    >
                                        <Link className={styles.linkHover} to={"/profile"}>My Profile</Link>
                                        <Link className={styles.linkHover} to={"/dashboard/home"}>Dashboard</Link>
                                        <Link className={styles.linkHover} to={"/user-orders"}>Orders</Link>

                                        <hr />

                                        <motion.div 
                                            onClick={handlinglogout}
                                            className={styles.logoutBtn}
                                            {...btnClick}>
                                                <LuLogOut />
                                                <p>Logout</p>
                                        </motion.div>

                                    </motion.div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to={"/login"} >
                                <motion.button className={styles.loginBtn} {...btnClick}>
                                    <LuLogIn />
                                    <p>Login</p>
                                </motion.button>
                            </NavLink>
                        </>
                    )
                    }
                </nav>
            </div>
        </>
    );
}
