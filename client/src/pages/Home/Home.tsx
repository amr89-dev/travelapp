import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppSelector } from "../../hooks/reduxHooks";
import HotelCard from "../../components/HotelCard/HotelCard";
import { InputSearch } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { gethotelsByParameter } from "../../redux/slices/hotel.slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const results = useAppSelector((state) => state.hotelReducer.results);
  const availableHotels = hotels.filter((hotel) => hotel.available);
  const [inputSearch, setinputSearch] = useState<InputSearch>({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    qty: "",
  });

  const hotelsToRender = availableHotels.filter((hotel) => {
    return (
      hotel.name?.toLocaleLowerCase().includes(inputSearch.city) ||
      hotel.city?.toLocaleLowerCase().includes(inputSearch.city) ||
      hotel.country?.toLocaleLowerCase().includes(inputSearch.city)
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinputSearch({
      ...inputSearch,
      [name]: value,
    });
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(gethotelsByParameter(inputSearch));
  };

  results.forEach((hotel) => {
    hotel.rooms?.forEach((room) => {
      console.log(room);
    });
  });

  return (
    <Layout>
      <SearchBar
        handleSearch={handleSearch}
        inputSearch={inputSearch}
        handleOnSubmit={handleOnSubmit}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-6">
        {hotelsToRender.map((hotel) => (
          <HotelCard key={hotel.idHotel} hotelData={hotel} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
