import personsServices from '../services/persons.js'

const Form = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotificationMessage, setErrorMessage }) => {

    const addPerson = (event) => {
        event.preventDefault();

        const newPerson = {
          name: newName.trim(),
          number: newNumber.trim(),
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
              setNotificationMessage(`${newPerson.name} ${newPerson.number} was added to the list`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
      
            })
            .catch(error => {
              console.error("Error adding person", error);
              setErrorMessage("Failed to add the contact. Please try again.");
              setTimeout(() => setErrorMessage(null), 3000);
            });
        }
        else {
          const confirmDelete = window.confirm(`Are you sure you want to update ${exist.name}'s number?`);

          if (confirmDelete) {

            const updatedPerson = {
              ...exist, 
              number: newNumber.trim()
            };

            personsServices
              .update(exist._id, updatedPerson)
              .then(response => {
                console.log("Person updated:", response.data)
                setPersons(persons.map(person => 
                  person._id === exist._id ? response.data : person
                ));
                setNewName('');
                setNewNumber('');
                setNotificationMessage(`${newPerson.name}'s number was updated`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
              })
              .catch(error => {
                console.error("Error updating person", error);
                setErrorMessage(`The contact ${exist.name} was already deleted from the server.`);
                setTimeout(() => setErrorMessage(null), 3000);
                setPersons(persons.filter(person => person._id !== exist._id))
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