import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main" style={{ padding: "100px 0 80px 0" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
