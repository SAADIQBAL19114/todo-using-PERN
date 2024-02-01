import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
