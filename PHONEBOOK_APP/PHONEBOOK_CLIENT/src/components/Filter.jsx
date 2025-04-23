const Filter = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <input
      data-testid="search-input"
      placeholder="search contact by name or number"
      className="filter-container"
      name="filter"
      value={search}
      onChange={handleSearchChange}
    />
  )
}

export default Filter
