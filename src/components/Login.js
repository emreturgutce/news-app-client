import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, login } = useContext(UserContext);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  const submitForm = async () => {
    if (isLoggedIn || isLoggedInState) return;
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Could not logged in");
      const { data } = response.data;
      const user = Object.assign({}, data.user);
      const token = user.tokens[user.tokens.length - 1].token;
      const time = new Date().getTime() + 1000 * 36000;
      document.cookie = `token=${token};expires=${time.toString()}`;
      delete user.createdAt;
      delete user.updatedAt;
      login({ ...user });
      setEmail("");
      setPassword("");
      setError("");
      setIsLoggedInState(true);
    } catch (err) {
      setError("Could not logged in");
    }
  };

  return (
    <>
      {isLoggedInState ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <div>
              {error ? <p>{error}</p> : null}
              <label htmlFor="email">Email</label>
              <input
                required
                minLength="6"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                minLength="6"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
