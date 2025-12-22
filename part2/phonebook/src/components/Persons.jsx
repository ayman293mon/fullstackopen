import {useState} from "react";
export default function PersonForm({filteredPersons}) {
    return (
        <div>
            {
                filteredPersons.map(person => 
                    <p key={person.id}>{person.name} {person.number}</p>
                )
            }
        </div>
    )
}