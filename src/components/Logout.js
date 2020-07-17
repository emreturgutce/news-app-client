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
        <button
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            border: 0,
            outline: "none",
            background: "none",
            color: "#eee",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
};

export default Logout;
