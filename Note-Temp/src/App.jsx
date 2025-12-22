import { use, useState } from 'react'
import Note from './components/Note'
const App = (props) => {
  const [notes, setNotes] = useState(props.notes || []);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const NoteToShow = showAll ? notes : notes.filter(note => note.important);
  const addNote = (e) => {
    e.preventDefault();
    setNotes(notes.concat({ id: String(notes.length + 1), content: newNote, important: Math.random() < .5 }));
    setNewNote('');
   }
  const handleNewNoteChange = (e) => setNewNote(e.target.value);
  const toggleShowAll = () => setShowAll(!showAll);
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={toggleShowAll}> show {showAll ? 'important' : 'all' } </button>
      <ul>
        {NoteToShow.map((note) => (
          <Note key={note.id} note={note} />
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
