import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      let token;
      document.cookie.split("; ").forEach((cookie) => {
        if (cookie.startsWith("token")) {
          token = cookie.split("=")[1];
        }
      });
      if (!token) throw new Error();
      await Axios.get("http://localhost:5000/me/logout", {
        headers: { Authorization: `bearer ${token}` },
      });
      document.cookie = "token=";
      setIsLoggedIn(false);
      logout();
    } catch (error) {}
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <button
            style={{ width: "50px", height: "20px", display: "inlineBlock" }}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
};

export default Logout;
