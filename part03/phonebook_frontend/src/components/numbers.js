import React from "react";
import personsService from "../services/persons";

const Numbers = ({ persons, setPersons, search, setNotificationMessage }) => {
  // Filter persons based on search
  const filterPersons = persons
    .filter(person => {
      const nameMatches = person.name
        ? person.name.toLowerCase().includes(search.toLowerCase())
        : false;
      const numberMatches = person.number
        ? person.number.includes(search)
        : false;
      return nameMatches || numberMatches;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Handle delete
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}'s number?`);

    if (confirmDelete) {
      personsService
        .deletePerson(id)
        .then(() => {
          setNotificationMessage(`${name}'s number was deleted`);
          setPersons(persons.filter(person => person._id !== id)); // Update the state
          setTimeout(() => {
            setNotificationMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log("Error deleting person", error);
        });
    }
  };

  return (
    <div className="container">
      {filterPersons.map((person) =>
        person._id ? (
          <div className="contact-card" key={person._id}>
            <div>
              <div className="contact-name">{person.name}</div>
              <div className="contact-number">{person.number}</div>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(person._id, person.name)}
            >
              Delete
            </button>
          </div>
        ) : null // Skip rendering if _id is not available
      )}
    </div>
  );
};

export default Numbers;