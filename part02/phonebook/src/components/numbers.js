import React from "react";
import personsService from "../services/persons";


const Numbers = ( {persons, setPersons, search, setNotificationMessage } ) => {

    const filterPersons = persons.filter(person => {
        // Ensure both name and number are strings before checking includes
        const nameMatches = person.name ? person.name.toLowerCase().includes(search.toLowerCase()) : false;
        const numberMatches = person.number ? person.number.includes(search) : false;
        return nameMatches || numberMatches;
    });
    
    const handleDelete = (id, name) => {
        // Ask the user to confirm the delete action
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name} person?`);
        
        if(confirmDelete) {
        personsService
          .deletePerson(id)
          .then(response => {
            setNotificationMessage(`${persons.name}'s number was deleted`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
            console.log("Person deleted:", response);
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch (error => {
            console.log("Error deliting person", error);
          })
        }
    }

    return (
    <div>
        {filterPersons.map((person) => (
        <div key={person.id || person.name}> 
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
        ))}
    </div>
  )
}

export default Numbers
