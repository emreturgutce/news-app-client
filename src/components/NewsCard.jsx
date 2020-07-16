import React, { useContext, useEffect, useState } from "react";
import FavoriteContext from "../context/FavoriteContext";
import Axios from "axios";

const NewsCard = () => {
  const { newsData, fetchFavorite } = useContext(FavoriteContext);
  const [news, setNews] = useState(newsData);

  useEffect(() => {
    setNews(newsData);
  }, [newsData]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      let token;
      document.cookie.split("; ").forEach((cookie) => {
        if (cookie.startsWith("token")) {
          token = cookie.split("=")[1];
        }
      });
      if (!token) throw new Error();
      const response = await Axios.get("http://localhost:5000/favorites/news", {
        headers: { Authorization: `bearer ${token}` },
      });
      if (response.status !== 200) throw new Error();
      const articles = response.data.data.articles;
      fetchFavorite("newsData", { articles });
    } catch (err) {}
  };

  const renderNews = () => {
    if (news.articles) {
      return news.articles.map((article) => {
        return <p key={article.title}>{article.title}</p>;
      });
    } else {
      return null;
    }
  };

  return <div>{renderNews()}</div>;
};

export default NewsCard;
