import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import api from "./api/axios";
// import {useCookies, useEffect,useNavigate } from "react"
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  const cookie = useCookies(["token"]);

  //   const navigate = useNavigate();

  // useEffect(() => {
  //   if (!Object.keys(cookie).length) {
  //     navigate("/login");
  //   }
  // }, [cookie,navigate]);
  // function ProtectedRoutes(props) {
  //   if (Object.keys(cookie).length) {
  //     console.log("User found. Rendering protected content.");
  //     return props.children;
  //   } else {
  //     console.log("User not found. Redirecting to login.");
  //   }
  // }
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const myself = async () => {
      try {
        const { data } = await api.get("/users/myself");

        console.log(data);
        const { username, role } = data.data;
        console.log(username, role);
        setAuth({ username, role });
        console.log("auth >>>>>>>>>", auth);
      } catch (error) {
        console.log(error);
        console.log("error >>>>>>>>>>>>>>>>>>>>>");
      }
    };
    if (!Object.keys(auth).length && Object.keys(cookie[0]).length) {
      myself();
    }
    // myself()
  }, []);
  return (
    <>
      <Routes>
        {/* Public routes */}
        {/* <Route element={<ProtectedRoutes />}> */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* </Route> */}
        <Route
          path="/login"
          element={
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes>
              <Register />
            </ProtectedRoutes>
          }
        />

        {/* Private Routes */}

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
        <Route
          path="/user"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />

        {/* catch all  */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
