import React from "react";
import Logo from "../assets/loading.svg";
import "./Await.css";

const Await = () => {
  return (
    <>
      <img className="loading-icon" src={Logo} alt="Loading" width="36px" />
    </>
  );
};

export default Await;
