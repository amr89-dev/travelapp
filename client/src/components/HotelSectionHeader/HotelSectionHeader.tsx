const HotelSectionHeader = () => {
  return (
    <section className="w-full h-1/3  flex flex-col items-center justify-center gap-4 mt-4 shadow-sm">
      <h2 className="font-bold text-xl ">Hoteles Disponibles</h2>
      <p>Ver, agregar y editar hoteles</p>
      <input type="search" name="" id="" className="border rounded-md p-1" />
      <div className="flex flex-row items-center justify-center gap-4">
        <button className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded">
          Agregar hotel
        </button>
        <button className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded">
          Agregar hotel
        </button>
      </div>
    </section>
  );
};

export default HotelSectionHeader;
