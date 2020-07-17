import React, { useContext, useEffect, useState } from "react";
import FavoriteContext from "../context/FavoriteContext";
import Axios from "axios";
import NewsCard from "./NewsCard";
import "./NewsContainer.css";
import { url } from "../url";

const NewsContainer = () => {
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
      const response = await Axios.get(url + "/favorites/news", {
        headers: { Authorization: `bearer ${token}` },
      });
      if (response.status !== 200) throw new Error();
      const articles = response.data.data.articles;
      fetchFavorite("newsData", { articles });
    } catch (err) {}
  };

  const renderNews = () => {
    if (news.articles) {
      return news.articles.map((article) => (
        <NewsCard key={article.title} info={article} />
      ));
    } else {
      return null;
    }
  };
  return <div className="news-container">{renderNews()}</div>;
};

export default NewsContainer;
