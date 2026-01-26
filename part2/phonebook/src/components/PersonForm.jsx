import { useState } from "react";
import phonebook from '../services/phonebook'
export default function PersonForm({ persons, setPersons, setNotification }) {
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
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personToUpdate = persons.find(person => person.name === newName)
                const updatedPerson = { ...personToUpdate, number: newNumber }
                phonebook.update(personToUpdate.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotification(`Updated ${newName}'s number`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    }).catch(error => {
                        setNotification(`Information of ${newName} has already been removed from server: ${error.message}`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    });
            }
        } else {
            const newPerson = { name: newName, number: newNumber }
            phonebook.create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotification(`Added ${newName}`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                }).catch(error => {
                    setNotification(`Error adding person: ${error.message}`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })

        }
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