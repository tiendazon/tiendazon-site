import React from "react";

const SearchBox = ({ value, onSearch, ...rest }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      {...rest}
    />
  );
};

export default SearchBox;
