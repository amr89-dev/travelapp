const Hotel = require("../models/Hotel");

const hotels = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Grand Star Hotel",
    address: "123 Elegant Avenue",
    city: "Metropolis",
    country: "United Kingdom",
    description: "A five-star experience for the discerning traveler.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Seaside Resort",
    address: "456 Beachfront Road",
    city: "Coastal City",
    country: "United States",
    description: "Escape to our tranquil beachfront oasis.",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Mountain Lodge Retreat",
    address: "789 Alpine Lane",
    city: "Mountainville",
    country: "Canada",
    description: "Experience nature's beauty in comfort.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    name: "City Lights Inn",
    address: "101 Urban Street",
    city: "Downtown",
    country: "France",
    description: "Stay in the heart of the vibrant city.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    name: "Riverside Lodge",
    address: "222 Riverside Drive",
    city: "Riverbank",
    country: "Australia",
    description: "Relax by the river and enjoy serene views.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    name: "Historic Mansion Hotel",
    address: "333 Heritage Lane",
    city: "Old Town",
    country: "Italy",
    description: "Experience the opulence of a bygone era.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    name: "Desert Oasis Resort",
    address: "444 Sand Dune Avenue",
    city: "Desertville",
    country: "United Arab Emirates",
    description: "Indulge in luxury in the midst of the desert.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Forest Lodge",
    address: "555 Evergreen Road",
    city: "Woodland",
    country: "Germany",
    description: "Find tranquility among towering trees.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Tropical Paradise Inn",
    address: "666 Palm Beach Boulevard",
    city: "Island Town",
    country: "Brazil",
    description: "Escape to a lush paradise by the sea.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
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
