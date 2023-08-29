import Layout from "../../components/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import HotelCard from "../../components/HotelCard/HotelCard";
import { setErrorHotel, setResult } from "../../redux/slices/hotel.slice";
import Swal from "sweetalert2";

const Home = () => {
  const dispatch = useAppDispatch();
  const hotelsState = useAppSelector((state) => state.hotelReducer);
  const { hotels, error } = hotelsState;
  const results = useAppSelector((state) => state.hotelReducer.results);
  const availableHotels = hotels.filter((hotel) => hotel.available);
  const hotelsToRender = results.length ? results : availableHotels;

  const resetResults = () => {
    dispatch(setResult([]));
  };

  if (error?.message) {
    Swal.fire({
      title: "Error!",
      text: `${error?.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setErrorHotel(null));
    });
  }
  return (
    <Layout>
      <SearchBar />
      {results.length >= 1 && (
        <button
          onClick={() => {
            resetResults();
          }}
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Realizar otra busqueda
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-6">
        {hotelsToRender.map((hotel) => (
          <HotelCard key={hotel.idHotel} hotelData={hotel} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
