import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import FavoriteContext from "../context/FavoriteContext";
import "./CurrencyTable.css";

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

  const calculateCurrencyRate = (cur) => {
    return Math.round((1 / cur) * 1000) / 1000;
  };

  const renderCurrencyData = () => {
    if (currency) {
      return (
        <>
          <div className="currency-column">
            <h2>USD</h2>
            <span>{calculateCurrencyRate(currencyData.USD)}</span>
          </div>
          <div className="currency-column">
            <h2>EUR</h2>
            <span>{calculateCurrencyRate(currencyData.EUR)}</span>
          </div>
          <div className="currency-column">
            <h2>GBP</h2>
            <span>{calculateCurrencyRate(currencyData.GBP)}</span>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return <div className="currency-table-container">{renderCurrencyData()}</div>;
};

export default CurrencyTable;
