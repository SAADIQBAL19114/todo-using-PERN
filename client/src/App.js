import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css";
import { useEffect } from "react";

function App() {

  const [cookie] = useCookies(["auth-token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Object.keys(cookie).length) {
      navigate("/login");
    }
  }, [cookie,navigate]);
  function ProtectedRoutes(props) {
    if (Object.keys(cookie).length) {
      console.log("User found. Rendering protected content.");
      return props.children;
    } else {
      console.log("User not found. Redirecting to login.");
    }
  }
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoutes>
              <UserPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
