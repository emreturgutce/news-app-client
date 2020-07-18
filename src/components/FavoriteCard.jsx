import React, { useContext, useState, useEffect } from "react";
import FavoriteContext from "../context/FavoriteContext";
import axios from "../utils/axios";
import CurrencyLogo from "../assets/currency.svg";
import NewsLogo from "../assets/news.svg";
import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";
import "./FavoriteCard.css";

const FavoriteCard = ({ typeProp }) => {
  const [type, setType] = useState(typeProp);
  const { addFavorite, removeFavorite, favorites } = useContext(
    FavoriteContext
  );
  const [favoritesState, setFavoritesState] = useState(favorites);

  useEffect(() => {
    handleFavoriteProcesses();
  }, []);

  useEffect(() => {
    setFavoritesState(favorites);
  }, [favorites]);

  const handleFavoriteProcesses = async () => {
    try {
      if (favoritesState[type]) {
        const response = await axios.get(
          `/favorites/${type.toLowerCase()}/deactivate`
        );
        if (response.status !== 200) throw new Error();
        setFavoritesState[type] = false;
        removeFavorite(type.toLowerCase());
      } else {
        const response = await axios.get(
          `/favorites/${type.toLowerCase()}/activate`
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
      return MinusIcon;
    } else {
      return PlusIcon;
    }
  };

  const handleLogo = () => {
    if (type === "news") {
      return NewsLogo;
    } else if (type === "currency") {
      return CurrencyLogo;
    }
  };

  return (
    <div className="favorite-card-container">
      <div className="logo-container">
        <img src={handleLogo()} alt="favorite-logo" />
      </div>
      <div className="content-container">
        <div className="content-container-row">
          <h2>{handleFavoriteCardType()}</h2>
          <img
            onClick={handleFavoriteProcesses}
            className="favorite-card-button"
            src={handleButtonType()}
            alt="favorite-button-type"
          />
        </div>
        <div className="content-container-row">
          <p>Get the latest foreign exchange rates</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
