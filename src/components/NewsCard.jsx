import React from "react";
import "./NewsCard.css";

const NewsCard = ({ info }) => {
  return (
    <div className="news-card">
      <div className="news-card-side">
        <div className="news-card-title">
          <h2>
            <a href={info.url} target="_blank">
              {info.title}
            </a>
          </h2>
          <div className="news-card-sub-info">
            <span>{info.source.name}</span>
            <span>{info.publishedAt}</span>
          </div>
        </div>
        <p className="news-card-content">{info.description}</p>
      </div>
      <div className="news-card-photo-side">
        <img
          src={info.urlToImage}
          alt={info.title}
          width="140px"
          height="140px"
        />
      </div>
    </div>
  );
};

export default NewsCard;
