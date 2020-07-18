import React, { useEffect, useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Await from "./components/Await";
import UserContext from "./context/UserContext";
import FavoriteProvider from "./context/FavoriteProvider";
import axios from "./utils/axios";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("/me");
      const data = response.data;
      if (!data.success) throw new Error("Not successful");
      const user = Object.assign({}, data);
      delete user.createdAt;
      delete user.updatedAt;
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loading-container">
          <Await />
        </div>
      ) : (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <FavoriteProvider>
              <PrivateRoute exatch path="/" component={Home} />
            </FavoriteProvider>
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
