import React, { useContext, useState, useEffect } from "react";
import FavoriteContext from "../context/FavoriteContext";
import Axios from "axios";

const FavoriteCard = ({ typeProp }) => {
  const [type, setType] = useState(typeProp);
  const { addFavorite, removeFavorite, favorites } = useContext(
    FavoriteContext
  );
  const [favoritesState, setFavoritesState] = useState(favorites);

  useEffect(() => {
    setFavoritesState(favorites);
  }, [favorites]);

  const handleFavoriteProcesses = async () => {
    try {
      let token;
      document.cookie.split("; ").forEach((cookie) => {
        if (cookie.startsWith("token")) {
          token = cookie.split("=")[1];
        }
      });
      if (!token) throw new Error();
      if (favoritesState[type]) {
        const response = await Axios.get(
          `http://localhost:5000/favorites/${type.toLowerCase()}/deactivate`,
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        if (response.status !== 200) throw new Error();
        setFavoritesState[type] = false;
        removeFavorite(type.toLowerCase());
      } else {
        const response = await Axios.get(
          `http://localhost:5000/favorites/${type.toLowerCase()}/activate`,
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        if (response.status !== 200) throw new Error();
        setFavoritesState[type] = true;
        addFavorite(type.toLowerCase());
      }
    } catch (error) {}
  };

  const handleFavoriteCardType = () => {
    if (type === "news") {
      return <>Latest News</>;
    } else if (type === "currency") {
      return <>Currency News</>;
    }
  };

  const handleButtonType = () => {
    if (
      (type === "news" && favoritesState.news) ||
      (type === "currency" && favoritesState.currency)
    ) {
      return <>REMOVE</>;
    } else {
      return <>ADD</>;
    }
  };

  return (
    <div>
      <h2>{handleFavoriteCardType()}</h2>
      <button onClick={handleFavoriteProcesses}>{handleButtonType()}</button>
    </div>
  );
};

export default FavoriteCard;
