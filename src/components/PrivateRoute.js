import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) return <Redirect to={{ pathname: "/login" }} />;
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
