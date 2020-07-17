import React from "react";
import FavoriteCard from "./FavoriteCard";
import "./FavoriteContainer.css";

const FavoriteContainer = () => {
  return (
    <div className="favorite-container">
      <FavoriteCard typeProp="news" />
      <FavoriteCard typeProp="currency" />
    </div>
  );
};

export default FavoriteContainer;
