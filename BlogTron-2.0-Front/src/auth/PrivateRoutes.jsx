import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "./index";

function PrivateRoute({ children, ...rest }) {
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
        // state: { from: props.location },
      }}
    />
  );
}

export default PrivateRoute;
