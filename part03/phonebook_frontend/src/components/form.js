import personsServices from '../services/persons.js';
import { debounce } from 'lodash';

const Form = ({
  newName, setNewName, newNumber, setNewNumber,
  persons, setPersons, setNotificationMessage, setErrorMessage
}) => {
  
  // Function to validate phone number format: XX-XXXXXXX or XXX-XXXXXXXX
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\d{2,3}-\d{6,8})$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  // Show message function for notification or error
  const showMessage = (setMessage, message, timeout = 3000) => {
    setMessage(message);
    setTimeout(() => setMessage(null), timeout);
  };

  // Optimized submit handler using async/await with debounce
  const addPerson = debounce(async (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    // Validate fields
    if (!newName || !newNumber) {
      showMessage(setErrorMessage, "Both name and phone number must be provided.");
      return;
    }

    if (newName.length < 3) {
      showMessage(setErrorMessage, "Name must be at least 3 characters long.");
      return;
    }

    if (!validatePhoneNumber(newNumber)) {
      showMessage(setErrorMessage, "Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX.");
      return;
    }

    // Check if the contact already exists
    const exist = persons.find(person => person.name === newPerson.name);
    if (!exist) {
      // Create a new person
      try {
        const response = await personsServices.create(newPerson);

        // Optimize by batching state updates
        setPersons(prevPersons => [...prevPersons, response.data]); // Efficient state update
        setNewName('');
        setNewNumber('');
        showMessage(setNotificationMessage, `${newPerson.name} ${newPerson.number} was added to the list`);
      } catch (error) {
        console.error("Error adding person", error);
        const errorMsg = error.response?.data?.error || "Failed to add the contact. Please try again.";
        showMessage(setErrorMessage, errorMsg, 5000);
      }
    } else {
      // Ask the user if they want to update the contact
      const confirmDelete = window.confirm(`Are you sure you want to update ${exist.name}'s number?`);

      if (confirmDelete) {
        const updatedPerson = {
          ...exist,
          number: newNumber.trim(),
        };

        // Update the existing person
        try {
          const response = await personsServices.update(exist._id, updatedPerson);

          // Optimize by batching state updates
          setPersons(prevPersons =>
            prevPersons.map(person => person._id === exist._id ? response.data : person)
          );
          setNewName('');
          setNewNumber('');
          showMessage(setNotificationMessage, `${newPerson.name}'s number was updated`);
        } catch (error) {
          console.error("Error updating person", error);
          showMessage(setErrorMessage, `The contact ${exist.name} was already deleted from the server.`, 5000);
          setPersons(prevPersons => prevPersons.filter(person => person._id !== exist._id));
        }
      }
    }
  }, 500); // Debounce the handler by 500ms

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