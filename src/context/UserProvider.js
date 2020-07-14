import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import initialState from "./initialState";
import * as actionTypes from "./actionTypes";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const value = {
    ...state,
    login: (payload) => dispatch({ type: actionTypes.LOGIN, payload }),
    logout: () => dispatch({ type: actionTypes.LOGOUT }),
    signup: (payload) => dispatch({ type: actionTypes.SIGNUP, payload }),
    setUser: (payload) => dispatch({ type: actionTypes.SET_USER, payload }),
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
