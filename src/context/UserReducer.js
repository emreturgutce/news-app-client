import * as actionTypes from "./actionTypes";

const UserReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
