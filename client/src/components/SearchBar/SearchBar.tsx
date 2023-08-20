import { SearchBarProps } from "../../types/types";

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  return (
    <div className="w-full  flex flex-row justify-center p-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="search"
        placeholder="Busca un hotel o destino"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
