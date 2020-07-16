import React, { useRef } from "react";
import DownArrow from "../assets/down_arrow.svg";
import Avatar from "../assets/avatar.svg";
import "./Navbar.css";
import Logout from "./Logout";

const Navbar = () => {
  const logoutContainerRef = useRef(null);

  const handleShowingLogout = () => {
    const elem = logoutContainerRef.current;
    if (elem.classList.contains("show")) {
      elem.classList.remove("show");
    } else {
      elem.classList.add("show");
    }
  };

  return (
    <nav className="navbar">
      <h2>News App</h2>
      <div className="avatar-container" onClick={handleShowingLogout}>
        <div className="avatar-wrapper">
          <img
            className="avatar-image"
            src={Avatar}
            alt="avatar"
            width="64px"
          />
        </div>
        <span>
          <img
            className="down-arrow-image"
            src={DownArrow}
            alt="down_arrow"
            width="24px"
          />
        </span>
        <div ref={logoutContainerRef} className="logout-container">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
