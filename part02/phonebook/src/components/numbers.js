import React from "react";

const Numbers = ( {persons, search} ) => {
        const filterPersons = persons.filter(person => {
        // Ensure both name and number are strings before checking includes
        const nameMatches = person.name ? person.name.toLowerCase().includes(search.toLowerCase()) : false;
        const numberMatches = person.number ? person.number.includes(search) : false;
        return nameMatches || numberMatches;
    });
    return (
    <div>
        {filterPersons.map((person) => (
        <div key={person.id || person.name}> 
          {person.name} {person.number}
        </div>
        ))}
    </div>
  )
}

export default Numbers
