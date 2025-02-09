// utils/persons.js
import personsService from '../services/personsService';

export const addPerson = async (newPerson, persons, setPersons, setNotificationMessage, setErrorMessage) => {
  const existing = persons.find(person => person.name === newPerson.name);
  
  try {
    if (!existing) {
      const response = await personsService.create(newPerson);
      setPersons([...persons, response.data]);
      setNotificationMessage(`${newPerson.name} added`);
      setTimeout(() => setNotificationMessage(null), 3000);
    } else {
      if (window.confirm(`Update ${existing.name}'s number?`)) {
        const updatedPerson = await personsService.update(existing.id, newPerson);
        setPersons(persons.map(person => person.id !== existing.id ? person : updatedPerson.data));
        setNotificationMessage(`${newPerson.name}'s number updated`);
        setTimeout(() => setNotificationMessage(null), 3000);
      }
    }
  } catch (error) {
    setErrorMessage(error.response?.data.error || 'Operation failed');
  }
};