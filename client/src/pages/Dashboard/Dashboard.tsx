import HotelSectionHeader from "../../components/HotelSectionHeader/HotelSectionHeader";
import HotelSectionCards from "../../components/HotelsSectionCards/HotelSectionCards";
import SideBar from "../../components/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="h-[calc(100vh_-_64px)] flex flex-row">
      <SideBar />
      <div className="w-full flex flex-col">
        <HotelSectionHeader />
        <HotelSectionCards />
      </div>
    </div>
  );
};

export default Dashboard;
