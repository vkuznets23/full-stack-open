import React from 'react';
import personsServices from '../services/persons.js'

const Form = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        
        if (!newName || !newNumber || !isFinite(newNumber)) {
          alert("Both name and phone number must be provided.");
          return;
        }
        const exist = persons.find(person => person.name === newPerson.name)
        if (!exist) {
          personsServices
            .create(newPerson)
            .then(response => {
              setPersons(persons.concat(response.data))
              setNewName('') //clear input field
              setNewNumber('')
              console.log(response)
            })
            .catch(error => {
              console.error("Error adding person", error);
            });
        }
        else {
          const confirmDelete = window.confirm(`Are you sure you want to delete ${exist.name} person?`);

          if (confirmDelete) {
            personsServices
              .update(exist.id, {...exist, number: newNumber})
              .then(response => {
                console.log("Person updated:", response.data)
                setPersons(persons.map(person => 
                  person.id === exist.id ? response.data : person
                ));
                setNewName('');
                setNewNumber('');
              })
              .catch(error => {
                console.error("Error updating person", error);
              });
          }
        }
    }

return (
    <form onSubmit={addPerson}>
        <div>
          <div>
            name: <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}/>
          </div>
          <div>
            phone: <input 
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}/>
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    )
}

export default Form