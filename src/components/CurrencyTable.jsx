import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import FavoriteContext from "../context/FavoriteContext";

const CurrencyTable = () => {
  const { currencyData, fetchFavorite } = useContext(FavoriteContext);
  const [currency, setCurrency] = useState(currencyData);

  useEffect(() => {
    hadleFetchingCurrencyData();
  }, []);

  useEffect(() => {
    setCurrency(currencyData);
  }, [currencyData]);

  const hadleFetchingCurrencyData = async () => {
    try {
      let token;
      document.cookie.split("; ").forEach((cookie) => {
        if (cookie.startsWith("token")) {
          token = cookie.split("=")[1];
        }
      });
      if (!token) throw new Error();
      const response = await Axios.get(
        "http://localhost:5000/favorites/currency",
        { headers: { Authorization: `bearer ${token}` } }
      );
      if (response.status !== 200) throw new Error();
      const rates = response.data.data.rates;
      fetchFavorite("currencyData", rates);
    } catch (error) {}
  };

  const renderCurrencyData = () => {
    if (currencyData) {
      return (
        <div>
          <p>USD: {currencyData.USD}</p>
          <p>EUR: {currencyData.EUR}</p>
          <p>GBP: {currencyData.GBP}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return <div>{renderCurrencyData()}</div>;
};

export default CurrencyTable;
