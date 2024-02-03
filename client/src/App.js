import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import RequireAuth from "./components/RequireAuth";

function App() {
  // const [cookie] = useCookies(["auth-token"]);
  // const navigate = useNavigate();
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
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
        {/* catch all  */}
          <Route path="*" element={<Missing/>} />
      </Routes>
    </>
  );
}

export default App;
