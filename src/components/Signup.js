import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import axiosPublic from "../utils/axiosPublic";
import setToken from "../utils/setToken";
import "./Login.css";
import Background from "../assets/bg.svg";
import Avatar from "../assets/user.svg";
import Await from "./Await";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeToLogin, setChangeToLogin] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn, signup } = useContext(UserContext);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.post("/signup", {
        username,
        email,
        password,
      });
      if (response.data.message.includes("duplicate key error"))
        throw new Error("duplicate key error");
      if (!response.status === 201) throw new Error("Could not signed up");
      const { data } = response.data;
      const user = Object.assign({}, data.user);
      const token = user.tokens.token;
      setToken(token);
      delete user.createdAt;
      delete user.updatedAt;
      signup({ ...user });
      setUsername("");
      setPassword("");
      setEmail("");
      setError("");
      setIsLoggedInState(true);
    } catch (err) {
      setIsLoading(false);
      if (err.message === "duplicate key error")
        return setError("We already have a user with the given credentials");
      setError("Could not signed up");
    }
  };

  return (
    <>
      {isLoggedInState ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <>
          {changeToLogin ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <div className="container">
              <div className="bg-container">
                <img src={Background} alt="bg" width="600px" />
              </div>
              <div className="form-container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  <div className="form-row">
                    <img src={Avatar} alt="user" width="108px" />
                  </div>
                  {error ? (
                    <div className="error-box">
                      <span className="error">{error}</span>
                      <span className="close-icon" onClick={() => setError("")}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </span>
                    </div>
                  ) : null}
                  <div className="form-row">
                    <div className="input-container">
                      <div className="icon icon-user">
                        <label htmlFor="username">
                          <i className="fas fa-user"></i>
                        </label>
                      </div>
                      <div className="input-inner-container">
                        <input
                          required
                          type="text"
                          name="username"
                          id="usrename"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-container">
                      <div className="icon icon-envelope">
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i>
                        </label>
                      </div>
                      <div className="input-inner-container">
                        <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-container">
                      <div className="icon icon-lock">
                        <label htmlFor="password">
                          <i className="fas fa-lock"></i>
                        </label>
                      </div>
                      <div className="input-inner-container">
                        <input
                          required
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <button>{isLoading ? <Await /> : <>Sign up</>}</button>
                  </div>
                  <div
                    className="form-row"
                    onClick={() => setChangeToLogin(true)}
                  >
                    <p>Have an account ?</p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Signup;
