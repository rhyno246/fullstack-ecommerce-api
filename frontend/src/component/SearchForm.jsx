import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
const SearchForm = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const inputRef = useRef(null);
  const hanleSearch = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    history.push(`/products?keyword=${search}`);
    inputRef.current.value = "";
  };

  return (
    <div
      className="search-form"
      style={{ position: "relative", right: "60px" }}
    >
      <form onSubmit={hanleSearch}>
        <input
          placeholder="Search product...."
          className="input-search"
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon
          color="primary"
          sx={{ position: "absolute", top: "8px", right: "5px" }}
        />
      </form>
    </div>
  );
};

export default SearchForm;
