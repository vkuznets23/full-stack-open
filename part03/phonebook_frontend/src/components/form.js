import React, { useState } from 'react';
import { validateName, validatePhoneNumber } from '../utils/validators';
import { addPerson } from '../utils/addPerson';
import Modal from './modal'; // Import the Modal component

const Form = ({ persons, setPersons, setNotificationMessage, setErrorMessage, closeModal}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [modalErrorMessage, setModalErrorMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset modal error state
    setModalErrorMessage('');

    if (!newName || !newNumber) {
      setModalErrorMessage('Both name and phone number are required.');
      return;
    }

    if (!validateName(newName)) {
      setModalErrorMessage('Name must be at least 3 characters.');
      return;
    }

    if (!validatePhoneNumber(newNumber)) {
      setModalErrorMessage('Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX.');
      return;
    }

    const newPerson = { name: newName.trim(), number: newNumber.trim() };

    try {
      await addPerson(newPerson, persons, setPersons, setNotificationMessage, setErrorMessage);
      setNewName('');
      setNewNumber('');
      closeModal(); // Close the modal on successful submission
    } catch (error) {
      setModalErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      <Modal isOpen={true}>
        {/* Form inside modal */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            {/* Display error message only if there is an error */}
            {modalErrorMessage && (
              <div className="error-message">
                <p>{modalErrorMessage}</p>
              </div>
            )}

            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
            type="button"
            className="modal-close"
            onClick={closeModal} // Close the modal without submitting
          >Close</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Form;