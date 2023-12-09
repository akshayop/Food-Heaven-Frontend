import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducer";

const myReducers = combineReducers({
    user : userReducer,
    product: productReducer,
    allUsers: allUserReducer,
});

export default myReducers;