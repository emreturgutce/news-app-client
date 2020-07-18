import React, { useContext, useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import FavoriteContainer from "./FavoriteContainer";
import CurrencyTable from "./CurrencyTable";
import NewsContainer from "./NewsContainer";
import FavoriteContext from "../context/FavoriteContext";
import axios from "../utils/axios";

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
  }, [favorites.currency]);

  useEffect(() => {
    setNewsState(favorites.news);
  }, [favorites.news]);

  const getFavoritesInfo = async () => {
    try {
      const response = await axios.get("/favorites");
      const { currency, news } = response.data.data.favorites;
      if (currency && news) {
        addFavorite("news");
        addFavorite("currency");
      } else if (news) {
        addFavorite("news");
      } else if (currency) {
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
