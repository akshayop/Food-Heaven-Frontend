
const userReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_USER_DETAILS":    
            return action.user;

        case "GET_USER_DETAILS":
            return state;

        case "SET_USER_DETAILS_AS_NULL":    
            return action.user;
        
        default: 
            return state;

    }
};

export default userReducer;
