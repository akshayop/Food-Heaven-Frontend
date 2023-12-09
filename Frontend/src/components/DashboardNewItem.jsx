import React, { useState } from "react";
import AddItemInput from "./AddItemInput";
import styles from "../styles/dashboard.module.css";
import { status } from "../utils";
import { motion } from "framer-motion";
import { btnClick, scaleImage } from "../animation/index";
import SpinLoading from "./SpinLoading";
import { FaTrashCan, MdCloudUpload } from '../assets/icons'
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "@firebase/storage";
import { storage } from "../config/firebase.config";
import { addNewProduct, getProducts } from "../api";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../context/actions/productAction"

export default function DashboardNewItem() {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageDownload, setImageDownload] = useState(null);
    const [progress, setProgress] = useState(null)
    const dispatch = useDispatch();

    const uploadImage = ( e ) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, 
            (error) => {
                // Handle unsuccessful uploads
                toast.error("Error", error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageDownload(downloadURL);
                    setIsLoading(false);
                    setProgress(null);
                    toast.success("Image Uploaded to cloud Successfully :)")
                });
            }
        );
    }

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageDownload);

        deleteObject(deleteRef).then(() => {
            setImageDownload(null);
            setIsLoading(false);
            toast.success("The image has been removed.")
        })
    }

    const handleSubmitBtn = () => {
        const data = {
            product_name: itemName,
            product_category: category,
            product_price: price,
            product_image: imageDownload
        }

        addNewProduct(data).then(( res ) => {
            toast.success('Added New Item');
            setItemName("");
            setCategory(null);
            setPrice("");
            setImageDownload(null);
        });

        getProducts().then((data) => {
            dispatch(setAllProducts(data));
        });

    
    }

    return (
        <>
            <div className={styles.addItemContainer}>
                <div className={styles.addItemSubContainer}>
                    <AddItemInput
                        type="text"
                        placeholder={"Item Name"}
                        stateFunction={setItemName}
                        stateValue={itemName}
                    />

                    <div className={styles.itemsCategoryContainer}>
                        {status &&
                        status?.map((data) => (
                            <motion.p
                            {...btnClick}
                            key={data.id}
                            onClick={(e) => {
                                e.preventDefault();
                                setCategory(data.category);
                            }}
                            className={
                                data.category === category
                                ? styles.activeItemsCategory
                                : styles.notActiveItemsCategory
                            }
                            >
                            {data.title}
                            </motion.p>
                        ))}
                    </div>

                    <AddItemInput
                        type="number"
                        placeholder={"Item Price"}
                        stateFunction={setPrice}
                        stateValue={price}
                    />

                    <div className={styles.imageUploadContainer}>
                        {isLoading ? (
                            <div className={styles.spinerLoading}>
                                <SpinLoading />
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBarWrapper}>
                                        <div className={styles.crimsonBar} style={{width: `${Math.round(progress)}%`}}></div>
                                        <div className={styles.percentage}>
                                            {Math.round(progress) > 0 && (
                                                <>{`${Math.round(progress)}%`}</>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (       
                            <>
                                {!imageDownload ? (
                                    <>
                                        <label>
                                            <motion.div { ...btnClick } className={styles.uploadImageContainer}>
                                                <div className={styles.uploadImage}>
                                                    <p  className={styles.uploadImageIcon}>
                                                        <MdCloudUpload />
                                                    </p>

                                                    <p className={styles.uploadImageTag}>
                                                        Click to upload an image
                                                    </p>
                                                </div>
                                            </motion.div>

                                            <input 
                                                type="file"
                                                name="uploadImage"
                                                accept="image/*"
                                                style={{width: 0, height: 0}}
                                                onChange={uploadImage} 
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.imageContainer}>
                                            <motion.img 
                                                className={styles.imageStyle}
                                                {...scaleImage}
                                                src={imageDownload}

                                            />

                                            <motion.button
                                                className={styles.deleteBtn}
                                                {...btnClick}
                                                type="button"
                                                onClick={() => deleteImage(imageDownload)}
                                            >
                                                <FaTrashCan />
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <motion.div 
                        {...btnClick}
                        className={styles.submitBtn}
                        onClick={handleSubmitBtn}
                    >
                        Save
                    </motion.div>
                </div>
            </div>
        </>
    );
}
