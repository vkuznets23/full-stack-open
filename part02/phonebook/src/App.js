import { useState, useEffect } from 'react'
import Form from './components/form.js'
import Filter from './components/filter.js'
import Numbers from './components/numbers.js'
import personsServices from './services/persons.js'
import Notification from './components/notification.js';
import MasgError from './components/error.js';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39445323523'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('effect');
    personsServices
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, [])

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <MasgError message={errorMessage} />
      <Filter 
      search={search}
      setSearch={setSearch} 
      setNotificationMessage={handleNotification}
      setErrorMessage={handleError}  
      />
      <h3>Add new</h3>
      <Form 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotificationMessage={handleNotification}
        setErrorMessage={handleError} 
      />
      <h3>Numbers</h3>
      <Numbers 
      persons={persons}
      setPersons={setPersons}
      search={search}
      setNotificationMessage={handleNotification}
      setErrorMessage={handleError}  
      />
    </div>
  )
}

export default App
