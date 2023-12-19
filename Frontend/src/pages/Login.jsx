import React, { useEffect, useState } from 'react';
import styles from "../styles/login.module.css";
import { LoginInput } from '../components';
import { websiteLogo } from '../assets';
import { FaLock, FcGoogle, MdMail } from '../assets/icons';
import { motion } from "framer-motion";
import { btnClick, landingPage } from '../animation';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config"
import { validateUserJWTToken } from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userAction';
import { toast } from "react-toastify";


export default function Login() {

    const [ userEmail, setUserEmail] = useState("");
    const [ isSignUp, setIsSignUp] = useState(false);
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");


    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        if(user) {
            navigate("/", {replace: true})
        }
    }, [user]);

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider)   
            .then((userCred) => {
                auth.onAuthStateChanged((cred) => {
                    if(cred) {
                        cred.getIdToken()
                            .then(token => {
                                validateUserJWTToken( token )
                                    .then(data => {
                                        dispatch(setUserDetails(data));
                                    });
                                navigate("/", {replace: true});
                            });
                    }
                });
            });
            // .catch((err) => {
            //     console.log(err);
            // }) 
    }

    const signUpManualy = async () => {

        if((userEmail === "") || (password  === "") || (confirmPassword  === "")) {
            toast.info('Required field Should not be empty')
        } else {
            if(password === confirmPassword) {
                setUserEmail("");
                setPassword("");
                setConfirmPassword("");
                await createUserWithEmailAndPassword(auth, userEmail, password)
                    .then(userCred => {
                        auth.onAuthStateChanged((cred) => {
                            if(cred) {
                                cred.getIdToken()
                                    .then(token => {
                                        validateUserJWTToken( token )
                                            .then(data => {
                                                dispatch(setUserDetails(data));
                                            });
                                        navigate("/", {replace: true});
                                    });
                            }
                        });
                    });
                
            } else {
                toast.warning('Passwords must match')
            }
        }
    }

    const signInManualy = async () => {
        if((userEmail === "") || (password  === "")) {
            toast.warning('Fill the fields with valid Info!')
        } else {
            await signInWithEmailAndPassword(auth, userEmail, password)
                .then(userCred => {
                    auth.onAuthStateChanged((cred) => {
                        if(cred) {
                            cred.getIdToken()
                                .then(token => {
                                    validateUserJWTToken( token )
                                        .then(data => {
                                            console.log(data);
                                        });
                                    navigate("/", {replace: true});
                                });
                        }
                    });
                })
        }
    }

    return (
        <>
        
            <div className={styles.loginPage}>
                {/* Background image */}
                {/* <img src={loginBG} alt='Background Image' /> */}
                
                {/* content box */}
                <motion.div 
                    {...landingPage}
                    className={styles.loginPageContainer}
                >

                    {/* Website Logo */}

                    <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                            <img src={websiteLogo} alt='logo'/>
                            <p>Food Heavn</p>
                        </div>
                    </div>

                    {/* Sign in  */}

                    <div className={styles.loginName}>
                        
                        {isSignUp ? (
                                <span>
                                    Sign up
                                </span>
                            ) : (
                                <span>
                                    Sign in
                                </span>
                        )}
                    </div>

                    <div className={styles.loginContent}>
                        {isSignUp ? (
                                <span>
                                    Sign up and enjoy the Servies...
                                </span>
                            ) : (
                                <span>
                                    Welcome back!  <br />
                                    <span>Sign in to order delicious food.....</span>
                                </span>
                        )}
                    </div>

                    {/* Login  */}

                    <div className={styles.loginContainer}>
                        <LoginInput 
                            placeHoleder={"Email"} 
                            icon={ <MdMail />}
                            inputState={userEmail} 
                            inputStateFunc={setUserEmail} 
                            type="email" 
                            isSignUp={isSignUp}
                        /> 

                        <LoginInput 
                            placeHoleder={"Password"} 
                            icon={<FaLock />} 
                            inputState={password} 
                            inputStateFunc={setPassword} 
                            type="password" 
                            isSignUp={isSignUp}
                        />

                        { isSignUp && (
                            <LoginInput 
                                placeHoleder={"Confirm Password"} 
                                icon={<FaLock />} 
                                inputState={confirmPassword} 
                                inputStateFunc={setConfirmPassword} 
                                type="password" 
                                isSignUp={isSignUp}
                            />
                        )}

                        {/* login button */}

                        <div className={styles.submitBtn}>
                            {isSignUp ? (
                                <button onClick={signUpManualy}>
                                    Sign up
                                </button>
                            ) : (
                                <button onClick={signInManualy}>
                                    Sign in
                                </button>
                            )}
                        </div>

                        <div className={styles.loginCheck}>
                            {!isSignUp ?(
                                <p>
                                    Don't have an account?
                                    <motion.button
                                        onClick={() => setIsSignUp(true)}
                                        {...btnClick}
                                    >
                                        Sign up
                                    </motion.button> 
                                </p>
                            ) :(
                                <p>
                                    Already have an account? 
                                    <motion.button
                                        onClick={() => setIsSignUp(false)}
                                        {...btnClick}
                                    >
                                        Sign in
                                    </motion.button>
                                </p>
                            )}
                        </div>

                        <div className={styles.orSpace}>
                            <div className={styles.dash}></div>
                            <p> or </p>
                            <div className={styles.dash}></div>
                        </div>

                        <motion.div  
                            {...btnClick}
                            onClick={loginWithGoogle}
                            className={styles.googleContainer}
                        >
                            <FcGoogle />
                            <p>Signin with Google</p>
                        </motion.div>
                    </div>

                    
                    
                </motion.div>

                
            </div>

            
        </>
    )
}
