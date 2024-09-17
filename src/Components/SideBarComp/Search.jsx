import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <>
      <div className="search-div">
        <FaSearch className="search-icon" size={50}/>
        <input className="input-search" type="text" placeholder="Search Message" />
      </div>
      <div className="divider">
      </div>
    </>
  );
};

export default Search;
