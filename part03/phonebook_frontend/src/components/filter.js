import React from "react";

const Filter = ({ search, setSearch }) => {
  return (
    <div className="filter-container">
      <input
        className="filter-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for contacts..."
      />
    </div>
  );
};

export default Filter;