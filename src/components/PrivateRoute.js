import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Redirect as Navigate, Route, Switch as Routes } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
    <Route
      {...rest}
      exact
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
    </Routes>
  );
};

export default PrivateRoute;
