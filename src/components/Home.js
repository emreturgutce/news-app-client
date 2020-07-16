import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import FavoriteCard from "./FavoriteCard";
import CurrencyTable from "./CurrencyTable";
import NewsCard from "./NewsCard";
import FavoriteContext from "../context/FavoriteContext";
import Axios from "axios";

const Home = () => {
  const { favorites, addFavorite } = useContext(FavoriteContext);
  const [currencyState, setCurrencyState] = useState(favorites.currency);
  const [newsState, setNewsState] = useState(favorites.news);

  useEffect(() => {
    getFavoritesInfo();
  }, []);

  useEffect(() => {
    setCurrencyState(favorites.currency);
  }, [favorites]);

  useEffect(() => {
    setNewsState(favorites.news);
  }, [favorites]);

  const getFavoritesInfo = async () => {
    try {
      let token;
      document.cookie.split("; ").forEach((cookie) => {
        if (cookie.startsWith("token")) {
          token = cookie.split("=")[1];
        }
      });
      if (!token) throw new Error();
      const response = await Axios.get("http://localhost:5000/favorites", {
        headers: { Authorization: `bearer ${token}` },
      });
      const currencyStatus = response.data.data.favorites.currency;
      const newsStatus = response.data.data.favorites.news;
      if (currencyStatus && newsStatus) {
        addFavorite("news");
        addFavorite("currency");
      } else if (newsStatus) {
        addFavorite("news");
      } else if (currencyStatus) {
        addFavorite("currency");
      }
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <Container>
        Welcome to the ⚛ WORLD
        <FavoriteCard typeProp="news" />
        <FavoriteCard typeProp="currency" />
        {currencyState ? <CurrencyTable /> : null}
        {newsState ? <NewsCard /> : null}
      </Container>
    </div>
  );
};

export default Home;
