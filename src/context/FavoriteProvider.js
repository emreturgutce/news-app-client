import React, { useReducer } from "react";
import FavoriteContext from "./FavoriteContext";
import FavoriteReducer from "./FavoriteReducer";
import favoriteInitialState from "./favoriteInitialState";
import * as actionTypes from "./actionTypes";

const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FavoriteReducer, favoriteInitialState);
  const value = {
    ...state,
    addFavorite: (payload) =>
      dispatch({ type: actionTypes.ADD_FAVORITE, payload }),
    removeFavorite: (payload) =>
      dispatch({ type: actionTypes.REMOVE_FAVORITE, payload }),
    fetchFavorite: (type, data) =>
      dispatch({ type: actionTypes.FETCH_FAVORITE, payload: { type, data } }),
  };
  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
