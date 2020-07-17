import React from "react";
import "./Container.css";

const Container = ({ children }) => {
  return (
    <div className="content-container">
      <div className="inner-container">{children}</div>
    </div>
  );
};

export default Container;
