import { useState, useEffect } from 'react';
import Filter from './components/filter.js';
import Numbers from './components/numbers.js';
import personsServices from './services/persons.js';
import Notification from './components/notification.js';
import MasgError from './components/error.js';
import Modal from "./components/modal.js";
import Form from './components/form.js';

import './styles.css';
import './loader.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  useEffect(() => {
    personsServices
      .getAll()
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
        setErrorMessage('Failed to fetch data.');
        setTimeout(() => setErrorMessage(null), 3000);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // Show loading spinner or message
    return (
      <div className="phonebook-loader-container">
      <div className="phonebook-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    );
  }

  return (
    <div>
      <h2>Phonebook app</h2>
      <Notification message={notificationMessage} />
      <MasgError message={errorMessage} />
      <div className="container">
        <div className='contacts-header'>
          <h3 className='header-title'>Contacts</h3>
          <button
          className="add-contact-button"
          onClick={() => setIsModalOpen(true)}
        >
          + New Contact
        </button>
        </div>
        <Filter 
          search={search}
          setSearch={setSearch}
          setNotificationMessage={setNotificationMessage} 
          setErrorMessage={setErrorMessage}
        />
        
        {/* Modal for the Form */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Add New Contact</h3>
          <Form 
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
            persons={persons}
            setPersons={setPersons}
            setNotificationMessage={setNotificationMessage} 
            setErrorMessage={setErrorMessage}
            setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function here
          />
        </Modal>

        <Numbers 
          persons={persons}
          setPersons={setPersons}
          search={search}
          setNotificationMessage={setNotificationMessage} 
          setErrorMessage={setErrorMessage}
        />
      </div>
      <div className="footer">
        Made by <a href="https://www.linkedin.com/in/viktoriia-kuznetsova/">Viktoriia Kuznetsova</a>
      </div>
    </div>
  );
};

export default App;
