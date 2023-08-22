import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import HandleOpenProvider from "../../utils/context";

const Dashboard = () => {
  return (
    <div className="h-[calc(100vh_-_64px)] flex flex-row ">
      <HandleOpenProvider>
        <SideBar />
        <Outlet />
      </HandleOpenProvider>
    </div>
  );
};

export default Dashboard;
