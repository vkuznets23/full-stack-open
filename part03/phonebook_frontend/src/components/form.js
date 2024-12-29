import personsServices from '../services/persons.js';

const Form = ({
  newName, setNewName, newNumber, setNewNumber,
  persons, setPersons, setNotificationMessage, setErrorMessage
}) => {
  
  // Function to validate phone number format: XX-XXXXXXX or XXX-XXXXXXXX
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\d{2,3}-\d{6,8})$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    // Validate fields
    if (!newName || !newNumber) {
      alert("Both name and phone number must be provided.");
      return;
    }

    if (newName.length < 3) {
      setErrorMessage("Name must be at least 3 characters long.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    
    if (!validatePhoneNumber(newNumber)) {
      setErrorMessage("Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    // Check if the contact already exists
    const exist = persons.find(person => person.name === newPerson.name);
    if (!exist) {
      // Create a new person
      personsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data)); // Add the new person to the list
          setNewName(''); // Clear input fields
          setNewNumber('');
          setNotificationMessage(`${newPerson.name} ${newPerson.number} was added to the list`);
          setTimeout(() => setNotificationMessage(null), 3000);
        })
        .catch(error => {
          console.error("Error adding person", error);
          if (error.response && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Failed to add the contact. Please try again.");
          }
          setTimeout(() => setErrorMessage(null), 5000);
        });
    } else {
      // Ask the user if they want to update the contact
      const confirmDelete = window.confirm(`Are you sure you want to update ${exist.name}'s number?`);

      if (confirmDelete) {
        const updatedPerson = {
          ...exist, 
          number: newNumber.trim(),
        };

        // Update the existing person
        personsServices
          .update(exist._id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person._id === exist._id ? response.data : person
            ));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`${newPerson.name}'s number was updated`);
            setTimeout(() => setNotificationMessage(null), 3000);
          })
          .catch(error => {
            console.error("Error updating person", error);
            setErrorMessage(`The contact ${exist.name} was already deleted from the server.`);
            setTimeout(() => setErrorMessage(null), 3000);
            setPersons(persons.filter(person => person._id !== exist._id));
          });
      }
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          name: <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Pekka Salmonen"
          />
        </div>
        <div>
          phone: <input 
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="358-401234"
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;