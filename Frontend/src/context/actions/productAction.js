export const getProductDetails = () => {
    return {
        type: "GET_PRODUCTS_DETAILS",
    };
};

export const setAllProducts = (product) => {
    return {
        type: "SET_ALL_PRODUCTS",
        product: product
    };
};