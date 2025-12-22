import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
export default function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: '2' },
    { name: 'Dan Abramov', number: '12-43-234345', id: '3' },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: '4' }
  ])
  const [filtered, setFiltered] = useState('')
  const filteredPersons = (filtered ? persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase())) : persons);
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

