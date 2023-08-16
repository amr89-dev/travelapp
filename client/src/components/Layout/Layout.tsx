import React from "react";
import { type childrenProps } from "../../types/types";
const Layout = ({ children }: childrenProps) => {
  return (
    <div className="max-w-screen-lg min-h-[calc(100vh_-_64px)] mx-auto ">
      {children}
    </div>
  );
};

export default Layout;
