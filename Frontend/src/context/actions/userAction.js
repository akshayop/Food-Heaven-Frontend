export const getUserDetails = () => {
    return {
        type: "GET_USER_DETAILS",
    }
};

export const setUserDetails = (user) => {
    return {
        type: "SET_USER_DETAILS",
        user: user
    }
}

export const setUserDetailsAsNull = () => {
    return {
        type: "SET_USER_DETAILS_AS_NULL",
        user: null
    };
};
