import React from "react";
import { type childrenProps } from "../../types/types";
const Layout = ({ children }: childrenProps) => {
  return (
    <div className="max-w-screen-xl  min-h-[calc(100vh_-_64px)] flex flex-row  justify-center ">
      {children}
    </div>
  );
};

export default Layout;
