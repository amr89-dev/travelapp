import HotelSectionHeader from "../../components/HotelSectionHeader/HotelSectionHeader";
import HotelSectionCards from "../../components/HotelsSectionCards/HotelSectionCards";
import SideBar from "../../components/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="h-[calc(100vh_-_64px)] flex flex-row relative">
      <SideBar />
      <div className="w-full flex flex-col">
        <HotelSectionHeader />
        <HotelSectionCards />
      </div>
      <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-red-500 "></div>
    </div>
  );
};

export default Dashboard;
