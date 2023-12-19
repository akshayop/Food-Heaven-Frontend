import axios from "axios";

// main url
export const apiRoot =
  "http://127.0.0.1:5001/food-heaven-app-98e0a/us-central1/app";

// Authentication
export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${apiRoot}/api/users/jwt-verification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// added new product

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${apiRoot}/api/products/create-product`, {
      ...data,
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// Get products

export const getProducts = async () => {
  try {
    const res = await axios.get(`${apiRoot}/api/products/show-products`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// Deleting products

export const deleteProducts = async (product_id) => {
  try {
    const res = await axios.delete(
      `${apiRoot}/api/products/delete/${product_id}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// getting all users

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${apiRoot}/api/users/show-users`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// adding new item to cart

export const addItemToCart = async (userId, data) => {
  try {
    const res = await axios.post(
      `${apiRoot}/api/products/add-to-cart/${userId}`,
      { ...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// getting cart details

export const getItemFromcart = async (userId) => {
  try {
    const res = await axios.get(
      `${apiRoot}/api/products/get-cart-items/${userId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// upadating cart items quantity

export const increaseQuantity = async (userId, productId, type) => {
  try {
    const res = await axios.post(
      `${apiRoot}/api/products/update-cart/${userId}`,
      null,
      { params: { productId: productId, type: type } }
    );
  } catch (err) {
    return null;
  }
};


