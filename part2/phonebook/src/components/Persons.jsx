import phonebook from '../services/phonebook.js'
export default function Persons({ filteredPersons, persons, setPersons, setNotification }) {
    const onDeletePerson = (id) => {
        const person = persons.find(p => p.id === id);
        if (person && window.confirm(`Delete ${person.name} ?`)) {
            phonebook.remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id));
                    setNotification(`Deleted ${person.name}`);
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000);
                })
                .catch(() => {
                    setNotification(`Information of ${person.name} has already been removed from server`);
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000);
                });
        }
    }
    return (
        <div>
            {
                filteredPersons.map(person =>
                    <p key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => onDeletePerson(person.id)}>delete</button>
                    </p>
                )
            }
        </div>
    )
}