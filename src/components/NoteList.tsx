// import { useState } from 'react'

// function NoteList() {
//   const [notes, setNotes] = useState<
//     { key: string; value: string }[] | { key: string; value: string } | null
//   >(
//     localStorage.getItem('note')
//       ? [JSON.parse(localStorage.getItem('note')!)]
//       : null
//   )

// const handleShowNotes = () => {
//   setNotes([]) // Clear the existing notes array
//   Object.keys(localStorage).forEach((key) => {
//     if (key.includes('note')) {
//       console.log(localStorage.getItem(key))
//       const item = localStorage.getItem(key)
//       if (item) {
//         setNotes((prevNotes) => {
//           return [...prevNotes, JSON.parse(item)]
//         })
//       }
//     }
//   })
// }

//   return (
//     <div>
//       {/* <button type="submit" className="btn" onClick={handleShowNotes}>
//         Show the notes
//       </button> */}
//       <ul>
//         {notes.map((note: { key: string; value: string }, index: number) => (
//           <li key={index}>{JSON.stringify(note)}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default NoteList
