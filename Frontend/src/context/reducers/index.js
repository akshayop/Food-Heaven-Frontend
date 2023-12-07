import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

const myReducers = combineReducers({
    user : userReducer,
    product: productReducer,
});

export default myReducers;