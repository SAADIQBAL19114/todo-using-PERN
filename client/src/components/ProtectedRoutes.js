import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useLocation, useNavigate, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import UserPage from "../pages/UserPage";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [cookies] = useCookies(["token"]);
  const location = useLocation();
  const hasCookies = cookies.token;
  console.log("auth?>>>>>>>", auth);
  console.log("coooooookies", hasCookies);

  return hasCookies ? <Navigate to={location.pathname} /> : props.children;
};

export default ProtectedRoutes;
