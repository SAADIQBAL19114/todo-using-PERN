import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
//   const token = auth.token;
//   console.log("token", token);
//   useEffect(() => {
//     const myself = async () => {
//       if (token) {
//         try {
//           const { data } = await api.get("/users/myself");
//           console.log("hidsgnakdjgkdjhakgjda");
//           console.log(data);
//           const { username, role } = data.data;
//           console.log(username, role);
//           setAuth({ username, role });
//           console.log(auth);

//           console.log("auth >>>>>>>>>", auth);
//         } catch (error) {
//           console.log(error);
//           console.log("error >>>>>>>>>>>>>>>>>>>>>");
//         }
//       }
//     };
//     myself();
//   }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
