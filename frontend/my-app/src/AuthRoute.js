import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Replace this with your real authentication check (context, redux, localStorage, etc.)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // example: check if token exists
};

const AuthRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If children are passed, render them; otherwise render nested routes via <Outlet />
  return children ? children : <Outlet />;
};

export default AuthRoute;