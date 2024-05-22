import React from "react";
import { useState, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const loggedInUser = localStorage.getItem("auth");
  const foundUser = JSON?.parse(loggedInUser);
  return foundUser ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
};
export default PrivateRoute;
