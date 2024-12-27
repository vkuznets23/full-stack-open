import React from "react";
import personsService from "../services/persons";


const Numbers = ( {persons, setPersons, search, setNotificationMessage } ) => {

    const filterPersons = persons
      .filter(person => {
        // Ensure both name and number are strings before checking includes
        const nameMatches = person.name ? person.name.toLowerCase().includes(search.toLowerCase()) : false;
        const numberMatches = person.number ? person.number.includes(search) : false;
        return nameMatches || numberMatches;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    
    const handleDelete = (id, name) => {
        // Ask the user to confirm the delete action
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}'s number?`);
        
        if(confirmDelete) {
        personsService
          .deletePerson(id)
          .then(() => {
            setNotificationMessage(`${name}'s number was deleted`)
            setPersons(persons.filter(person => person._id !== id));
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch (error => {
            console.log("Error deliting person", error);
          })
        }
    }

    return (
      <div>
      {filterPersons.map((person) => (
      person._id ? (
      <div key={person._id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person._id, person.name)}>delete</button>
      </div>
    ) : null // skip rendering if _id is not available
    ))}
    </div>
  )
}

export default Numbers