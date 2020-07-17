import React, { useContext, useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import FavoriteContainer from "./FavoriteContainer";
import CurrencyTable from "./CurrencyTable";
import NewsContainer from "./NewsContainer";
import FavoriteContext from "../context/FavoriteContext";
import Axios from "axios";
import { url } from "../url";

const Home = () => {
  const { favorites, addFavorite } = useContext(FavoriteContext);
  const [currencyState, setCurrencyState] = useState(favorites.currency);
  const [newsState, setNewsState] = useState(favorites.news);
  const NavbarMemoized = useMemo(() => Navbar, []);
  const CurrencyTableMemoized = useMemo(() => CurrencyTable, []);
  const FavoriteContainerMemoized = useMemo(() => FavoriteContainer, []);
  const NewsContainerMemoized = useMemo(() => NewsContainer, []);

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
      const response = await Axios.get(url + "/favorites", {
        headers: {
          Authorization: `bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
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
      <NavbarMemoized />
      <Container>
        <FavoriteContainerMemoized />
        {currencyState ? <CurrencyTableMemoized /> : null}
        {newsState ? <NewsContainerMemoized /> : null}
      </Container>
    </div>
  );
};

export default Home;
