import React, { useContext, useEffect, useState } from "react";
import FavoriteContext from "../context/FavoriteContext";
import axios from "../utils/axios";
import NewsCard from "./NewsCard";
import "./NewsContainer.css";

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
      const response = await axios.get("/favorites/news");
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
