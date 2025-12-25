import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import phonebook from './services/phonebook.js'
import Notifications from './components/Notifications.jsx'
export default function App() {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState('')
  const filteredPersons = (filtered ? persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase())) : persons);
  const [notification, setNotification] = useState('');
  useEffect(() => {
    phonebook.getAll()
      .then(data => setPersons(data))
      .catch(error => {
        setNotification('Error fetching phonebook data')
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications text={notification} />
      <Filter filtered={filtered} setFiltered={setFiltered} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} persons={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}

