import { useState } from 'react'
import '../App.css'

function Form() {
  const [notes, setNotes] = useState(localStorage.getItem('notes') || [])
  const [showModal, setShowModal] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [selectedNote, setSelectedNote] = useState<{
    id: number
    notes: string
  } | null>(null)
  const [updateNote, setUpdateNote] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const timestamp = new Date().getTime()
    if (localStorage.getItem('notes')) {
      const noteArray = JSON.parse(localStorage.getItem('notes') || '[]')
      noteArray.push({ id: timestamp, notes })
      localStorage.setItem('notes', JSON.stringify(noteArray))
      setNotes('')
    } else {
      localStorage.setItem('notes', JSON.stringify([{ id: timestamp, notes }]))
      setNotes('')
    }
    setNewNote('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value)
    setNewNote(event.target.value)
  }

  const handleUpdate = (note: { id: number; notes: string }) => {
    setSelectedNote(note)
    setShowModal(true)
  }

  const handleDelete = (note: { id: number; notes: string }) => {
    const noteArray = JSON.parse(localStorage.getItem('notes') || '[]')
    const updatedNotes = noteArray.filter(
      (noteItem: { id: number; notes: string }) => noteItem.id !== note.id
    )
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setNotes(updatedNotes) // Update the notes state
  }

  const handleSave = () => {
    const { id } = selectedNote || {}
    const noteArray = JSON.parse(localStorage.getItem('notes') || '[]')
    const updatedNotes = noteArray.map((note: { id: number; notes: string }) =>
      note.id === id ? { id, notes: updateNote } : note
    )
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setShowModal(false)
    setUpdateNote('')
  }

  return (
    <div>
      <div className="justify-content: flex-start">
        <form onSubmit={handleSubmit}>
          <h1>Notes</h1>
          <input
            type="text"
            placeholder="Add Note"
            className="input input-bordered w-full max-w-xs"
            defaultValue=""
            value={newNote}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Add Note
          </button>
        </form>
        <div style={{ flex: 'disply' }}>
          <div
            className="note-list"
            style={{ flex: 'disply', justifyContent: 'space-evenly' }}
          >
            {localStorage.getItem('notes') && (
              <ul>
                {JSON.parse(localStorage.getItem('notes') || '[]').map(
                  (note: { id: number; notes: string }, index: number) => (
                    <li key={index}>
                      {note.notes}{' '}
                      <button
                        className="btn"
                        onClick={() => handleUpdate(note)} // Fix: Pass a function reference instead of invoking the function directly
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        Update Note
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(note)} // Fix: Pass a function reference instead of invoking the function directly
                        style={{ backgroundColor: 'blue', color: 'white' }}
                      >
                        Delete Note
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" style={{ flex: 'disply' }}>
          <div className="modal-content">
            <input
              className="text-update"
              type="text"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
            ></input>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button
                className="btn"
                style={{ backgroundColor: 'blue' }}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{ backgroundColor: 'blue' }}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
