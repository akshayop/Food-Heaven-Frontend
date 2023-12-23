import { Routes, Route } from "react-router-dom";
import { AboutUs, Dashboard, Home, Login, Menu, Services } from "../pages";
import { CheckoutSuccess, Loading, Navbar, NavbarSet } from "./";
import "../styles/index.css";
import styles from "../styles/app.module.css";
import { getAuth } from "@firebase/auth";
import { app } from "../config/firebase.config";
import { useEffect, useState } from "react";
import { getItemFromcart, validateUserJWTToken } from "../api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../context/actions/userAction";
import { setCartItems } from "../context/actions/cartAction";

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if(data) {
              getItemFromcart(data.user_id).then((items) => {
                dispatch(setCartItems(items));
              })
            }
            dispatch(setUserDetails(data));
          });
        });
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      )}
      <NavbarSet>
        <Navbar />
      </NavbarSet>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="*" Component={Page404} />
      </Routes>
    </div>
  );
}

export default App;
