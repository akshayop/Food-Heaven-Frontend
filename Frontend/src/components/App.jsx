import {Routes, Route} from "react-router-dom";
import { Home, Login } from "../pages";
import "../styles/index.css";
import { getAuth } from "@firebase/auth";
import { app } from "../config/firebase.config";
import { useEffect, useState } from "react";
import { validateUserJWTToken } from '../api';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../context/actions/userAction";

const Page404 = () => {
  return <h1>404</h1>
}

function App() {

  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(( )=> {

    auth.onAuthStateChanged((cred) => {
      if(cred) {
          cred.getIdToken()
              .then(token => {
                  validateUserJWTToken( token )
                      .then(data => {
                          dispatch(setUserDetails(data));
                      });
              });
      }
      
    });

    setIsLoading(false);
  }, [])

  return (
    <div>

      {isLoading && (<p>Loading....</p>)}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" Component={Page404} />
      </Routes>

    </div>
  )
}

export default App
