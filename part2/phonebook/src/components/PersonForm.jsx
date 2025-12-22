import { useState } from "react";
export default function PersonForm({persons, setPersons}) {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleAddPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const newPerson = { name: newName, number: newNumber, id: String(persons.length + 1) }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }
    return (
        <>
        <form onSubmit={handleAddPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}