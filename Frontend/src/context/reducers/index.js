import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import getCartReducer from "./getCartReducer";

const myReducers = combineReducers({
    user : userReducer,
    product: productReducer,
    allUsers: allUserReducer,
    cart: cartReducer,
    isCart: getCartReducer,
});

export default myReducers;