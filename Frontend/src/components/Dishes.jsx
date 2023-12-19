import React, { useState } from "react";
import styles from "../styles/home.module.css";
import { status } from "../utils";
import { motion } from "framer-motion";
import {
  BiSolidBowlHot,
  BiSolidBowlRice,
  BiSolidDrink,
  GiCirclingFish,
  GiFruitBowl,
  GiNoodles,
  SiCakephp,
} from "../assets/icons";
import { useSelector } from "react-redux";
import { ItemCard } from "./";
import { fadeInOut } from  "../animation";

const Dishes = () => {
  const [category, setCategory] = useState("deserts");
  const products = useSelector((state) => state.product);

  return (
    <>
      <div className={styles.dishesContainer}>
        <div className={styles.footerWrapper}>
          <p>Dishes</p>
          <div className={styles.dashWrapper}></div>
        </div>

        <div className={styles.statusCards}>
          {status &&
            status.map((data, i) => (
              <DishesCard
                data={data}
                category={category}
                setCategory={setCategory}
                index={i}
                key={i}
              />
            ))}
        </div>

        <div className={styles.productCard}>
          {products &&
            products
              .filter((data) => data.product_category === category)
              .map((data, i) => <ItemCard key={i} data={data} index={i} />)}
        </div>
      </div>
    </>
  );
};

export const DishesCard = ({ data, category, setCategory, index }) => {
  return (
    <>
      <motion.div
        key={index}
        className={
          category === data.category
            ? styles.activeDishCard
            : styles.notActiveDishCard
        }
        {...fadeInOut(index)}
        onClick={() => setCategory(data.category)}
      >
        <div className={styles.iconcard}>
          {data.category === "fruits" ? (
            <GiFruitBowl />
          ) : data.category === "deserts" ? (
            <SiCakephp />
          ) : data.category === "chinese" ? (
            <GiNoodles />
          ) : data.category === "rice" ? (
            <BiSolidBowlRice />
          ) : data.category === "curry" ? (
            <BiSolidBowlHot />
          ) : data.category === "seaFoods" ? (
            <GiCirclingFish />
          ) : (
            <BiSolidDrink />
          )}
        </div>

        <div>{data.title}</div>
      </motion.div>
    </>
  );
};

export default Dishes;
