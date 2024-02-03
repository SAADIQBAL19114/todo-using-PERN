import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = ({ children }) => {
  return (
    <>
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
