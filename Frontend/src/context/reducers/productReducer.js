 
const productReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_ALL_PRODUCTS":    
            return action.product;

        case "GET_PRODUCTS_DETAILS":
            return state;
        
        default: 
            return state;

    }
};

export default productReducer;