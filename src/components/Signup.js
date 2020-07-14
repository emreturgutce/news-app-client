import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, signup } = useContext(UserContext);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  const submitForm = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });
      if (!response.status === 201) throw new Error("Could not signed up");
      const { data } = response.data;
      const user = Object.assign({}, data.user);
      const token = user.tokens.token;
      const time = new Date().getTime() + 1000 * 36000;
      document.cookie = `token=${token};expires=${time.toString()}`;
      delete user.createdAt;
      delete user.updatedAt;
      signup({ ...user });
      setUsername("");
      setPassword("");
      setEmail("");
      setError("");
      setIsLoggedInState(true);
    } catch (err) {
      setError("Could not signed up");
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
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <div>
              <label htmlFor="username">Username</label>
              <input
                required
                minLength="6"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                minLength="6"
                name="email"
                type="email"
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
            <button type="submit">
              Sign Up{" "}
              <span role="img" aria-label="Glasses">
                😎
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
