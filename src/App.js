import React, { useEffect, useContext, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Await from "./components/Await";
import Axios from "axios";
import UserContext from "./context/UserContext";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setUser, isLoggedIn } = useContext(UserContext);
  let time = Date.now;

  const getUser = async () => {
    try {
      const token = document.cookie.split("=")[1];
      if (!token) throw new Error();
      const response = await Axios.get("http://localhost:5000/me", {
        headers: { Authorization: `bearer ${token}` },
      });
      const data = response.data;
      if (!data.success) throw new Error();
      const user = Object.assign({}, data);
      delete user.createdAt;
      delete user.updatedAt;
      setUser(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Await />
      ) : (
        <>
          <h1>Hello World</h1>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exatch path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
