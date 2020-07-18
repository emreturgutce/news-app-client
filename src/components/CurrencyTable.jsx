import React, { useContext, useState, useEffect } from "react";
import axios from "../utils/axios";
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
      const response = await axios.get("/favorites/currency");
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
