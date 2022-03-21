import React, { useState } from "react";
import "./SearchBar.css";
import Button from "./Button";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    setSearch();
  };

  return (
    <div>
      <input className="search" placeholder="search for a store" />
      <Button className="submit-search" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
