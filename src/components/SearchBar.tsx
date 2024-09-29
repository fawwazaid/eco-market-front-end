import React, { useState } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((term: string) => {
    onSearch(term);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleChange}
      className="px-4 py-2 border rounded-lg shadow-sm w-64"
    />
  );
};

export default SearchBar;
