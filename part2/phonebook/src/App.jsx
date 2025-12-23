import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
export default function App() {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState('')
  const filteredPersons = (filtered ? persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase())) : persons);
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} setFiltered={setFiltered} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

