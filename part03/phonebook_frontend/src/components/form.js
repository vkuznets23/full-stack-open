import React, { useState } from 'react';
import { validateName, validatePhoneNumber } from '../utils/validators';
import { addPerson } from '../utils/addPerson';

const Form = ({ persons, setPersons, setNotificationMessage, setErrorMessage }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!newName || !newNumber) {
      setError('Both name and phone number are required.');
      return;
    }

    if (!validateName(newName)) {
      setError('Name must be at least 3 characters.');
      return;
    }

    if (!validatePhoneNumber(newNumber)) {
      setError('Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX.');
      return;
    }

    const newPerson = { name: newName.trim(), number: newNumber.trim() };
    
    await addPerson(newPerson, persons, setPersons, setNotificationMessage, setErrorMessage);

    setNewName('');
    setNewNumber('');
  };

  return (
    <div className="form-container">
      <h2>Add or Update Contact</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;