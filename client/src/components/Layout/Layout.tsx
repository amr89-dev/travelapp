import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="max-w-screen-lg mx-auto">{children}</div>;
};

export default Layout;
