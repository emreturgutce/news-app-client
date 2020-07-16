import React from "react";

const Container = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ paddingLeft: "180px", paddingRight: "180px" }}>
        {children}
      </div>
    </div>
  );
};

export default Container;
