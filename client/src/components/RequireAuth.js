import { useLocation, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";
import { useEffect } from "react";
import api from "../api/axios";
import { useCookies } from "react-cookie";

const RequireAuth = (props) => {
  const [cookies] = useCookies(["token"]);
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  return ["admin", "user"].includes(auth.role) || cookies.token ? (
    props.children
  ) : (
    <Navigate to={"/login"} />
  );
};

export default RequireAuth;
