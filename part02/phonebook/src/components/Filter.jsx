const Filter = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <input
      placeholder="search contact by name or number"
      value={search}
      onChange={handleSearchChange}
    />
  )
}

export default Filter
