import { useLocation, Navigate} from "react-router";
import useAuth from "../hooks/useAuth";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";

const RequireAuth = () => {
  const { auth } = useAuth();
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
