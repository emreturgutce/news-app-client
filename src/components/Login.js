import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import "./Login.css";
import Background from "../assets/bg.svg";
import Avatar from "../assets/user.svg";
import Await from "./Await";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [changeToSignUp, setChangeToSignUp] = useState(false);
  const { isLoggedIn, login } = useContext(UserContext);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    if (isLoggedIn || isLoggedInState) return;
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (!response.data.success) throw new Error("Could not logged in");
      const { data } = response.data;
      const user = Object.assign({}, data.user);
      const token = user.tokens[user.tokens.length - 1].token;
      const time = new Date().getTime() + 1000 * 36000;
      document.cookie = `token=${token};expires=${time.toString()};secure`;
      delete user.createdAt;
      delete user.updatedAt;
      login({ ...user });
      setEmail("");
      setPassword("");
      setError("");
      setIsLoggedInState(true);
    } catch (err) {
      setError("Could not logged in");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoggedInState ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <>
          {changeToSignUp ? (
            <Redirect to={{ pathname: "/signup" }} />
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
                    <button>{isLoading ? <Await /> : <>Login</>}</button>
                  </div>
                  <div
                    className="form-row"
                    onClick={() => setChangeToSignUp(true)}
                  >
                    <p>Do not have an account ?</p>
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

export default Login;
