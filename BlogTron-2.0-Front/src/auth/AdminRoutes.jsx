import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "./index";

function AdminRoute({ children, ...rest }) {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute;
