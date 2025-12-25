import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const NoteToShow = showAll ? notes : notes.filter(note => note.important);
  const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
  console.log('render', notes.length, 'notes')
  
  const addNote = (e) => {
    e.preventDefault();
    setNotes(notes.concat({ id: String(notes.length + 1), content: newNote, important: Math.random() < .5 }));
    setNewNote('');
   }
  const handleNewNoteChange = (e) => setNewNote(e.target.value);
  const toggleShowAll = () => setShowAll(!showAll);
  const toggleImportance = (id) => {
    console.log('importance of', id, 'needs to be toggled')
  }
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={toggleShowAll}> show {showAll ? 'important' : 'all' } </button>
      <ul>
        {NoteToShow.map((note) => (
          <Note 
          key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default App
