import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("users"))
  // const { isAuthenticated, users,  loading } = useSelector(
  //   (state) => state.user
  // );
  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (!token) {
            return <Redirect to="/login" />;
          }
          if (isAdmin === true && users?.user?.role === "user") {
            return <Redirect to="/profile" />;
          }
          return <Component {...props} {...rest} />;
        }}
      />
    </>
  );
};

export default ProtectedRoute;
