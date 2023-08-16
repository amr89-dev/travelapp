const Hotel = require("../models/Hotel");

const hotels = [
  {
    name: "Grand Star Hotel",
    address: "123 Elegant Avenue",
    city: "Metropolis",
    country: "United Kingdom",
    description: "A five-star experience for the discerning traveler.",
  },
  {
    name: "Seaside Resort",
    address: "456 Beachfront Road",
    city: "Coastal City",
    country: "United States",
    description: "Escape to our tranquil beachfront oasis.",
  },
  {
    name: "Mountain Lodge Retreat",
    address: "789 Alpine Lane",
    city: "Mountainville",
    country: "Canada",
    description: "Experience nature's beauty in comfort.",
  },
  {
    name: "City Lights Inn",
    address: "101 Urban Street",
    city: "Downtown",
    country: "France",
    description: "Stay in the heart of the vibrant city.",
  },
  {
    name: "Riverside Lodge",
    address: "222 Riverside Drive",
    city: "Riverbank",
    country: "Australia",
    description: "Relax by the river and enjoy serene views.",
  },
  {
    name: "Historic Mansion Hotel",
    address: "333 Heritage Lane",
    city: "Old Town",
    country: "Italy",
    description: "Experience the opulence of a bygone era.",
  },
  {
    name: "Desert Oasis Resort",
    address: "444 Sand Dune Avenue",
    city: "Desertville",
    country: "United Arab Emirates",
    description: "Indulge in luxury in the midst of the desert.",
  },
  {
    name: "Forest Lodge",
    address: "555 Evergreen Road",
    city: "Woodland",
    country: "Germany",
    description: "Find tranquility among towering trees.",
  },
  {
    name: "Tropical Paradise Inn",
    address: "666 Palm Beach Boulevard",
    city: "Island Town",
    country: "Brazil",
    description: "Escape to a lush paradise by the sea.",
  },
  {
    name: "Charming Cottage Hotel",
    address: "777 Country Lane",
    city: "Villageville",
    country: "Spain",
    description: "Experience the warmth of rustic hospitality.",
  },
];

const loadHotels = async () => {
  try {
    const conteoHoteles = await Hotel.count();
    if (conteoHoteles <= 0) {
      const newHotel = await Hotel.bulkCreate(hotels);
      console.log("Hoteles creados");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = loadHotels;
