import * as actionTypes from "./actionTypes";

const FavoriteReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: { ...state.favorites, [action.payload]: true },
      };
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: { ...state.favorites, [action.payload]: false },
      };
    case actionTypes.FETCH_FAVORITE:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
      };
    default:
      return state;
  }
};

export default FavoriteReducer;
