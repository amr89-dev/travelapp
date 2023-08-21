import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppSelector } from "../../hooks/reduxHooks";
import HotelCard from "../../components/HotelCard/HotelCard";

const Home = () => {
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const [inputSearch, setinputSearch] = useState("");

  const hotelsToRender = hotels.filter((hotel) => {
    return (
      hotel.available ||
      hotel.name?.toLocaleLowerCase().includes(inputSearch) ||
      hotel.city?.toLocaleLowerCase().includes(inputSearch) ||
      hotel.country?.toLocaleLowerCase().includes(inputSearch)
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputSearch(e.target.value.toLocaleLowerCase());
  };
  console.log(inputSearch);

  return (
    <Layout>
      <SearchBar handleSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-6">
        {hotelsToRender.map((hotel) => (
          <HotelCard key={hotel.idHotel} hotelData={hotel} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
