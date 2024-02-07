import { useLocation, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";
import { useEffect } from "react";
import api from "../api/axios";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  
  return auth?.role === "admin" ? (
    <AdminPage />
  ) : auth?.role === "user" ? (
    <UserPage />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
