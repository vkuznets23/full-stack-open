import React from "react";

const Numbers = ( {persons, search} ) => {
    const filterPersons = persons.filter(word => 
        word.name.toLowerCase().includes(search.toLowerCase()) ||
        word.number.includes(search)
      );
    return (
    <div>
        {filterPersons.map((person, id) => (
        <div key={id}> {person.name} {person.number}</div>
        ))}
    </div>
  )
}

export default Numbers
