import { useState } from "react";
import HotelSectionHeader from "../../components/HotelSectionHeader/HotelSectionHeader";
import HotelSectionCards from "../../components/HotelsSectionCards/HotelSectionCards";
import SideBar from "../../components/SideBar/SideBar";
import RoomSectionCards from "../../components/RoomsSectionCards/RoomSectionCards";

const Dashboard = () => {
  const [elementToRender, setElementToRender] = useState({
    hotel: true,
    reservations: false,
    rooms: false,
  });
  const handleView = (e: React.MouseEvent<HTMLButtonElement>) => {
    const view = e.currentTarget.id;

    setElementToRender({
      ...elementToRender,
      hotel: view === "hotel",
      rooms: view === "rooms",
      reservations: view === "reservations",
    });
  };

  return (
    <div className="h-[calc(100vh_-_64px)] flex flex-row ">
      <SideBar handleView={handleView} />
      {elementToRender.hotel && (
        <div className="w-full flex flex-col">
          <HotelSectionHeader />
          <HotelSectionCards />
        </div>
      )}
      {elementToRender.rooms && <RoomSectionCards />}
    </div>
  );
};

export default Dashboard;
