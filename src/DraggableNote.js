import React, { useState } from 'react';
import './styles.css'; // Import CSS file for styling

const DraggableNote = ({ id, text, position, setPosition }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });


const handleMouseDown = (event) =>{
  console.log("xx " , event.clientX," y", event.clientY )
  setDragStart({x: event.clientX - position.x , y :event.clientY - position.y })

  document.addEventListener("mousemove",handleMouseMove);
  document.addEventListener("mouseup",handleMouseUp);
}
  const handleMouseMove = (event) => {
    const newX = event.clientX - dragStart.x;
    const newY = event.clientY - dragStart.y;
    console.log("move x " , event.clientX,"move y", event.clientY )
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    // Remove event listeners for mousemove and mouseup events
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="note"
      style={{ position: 'absolute', top: position.y, left: position.x, cursor: 'grab' }}
      onMouseDown={handleMouseDown}
    >
      {text}
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const newNote = {
        id: notes.length + 1,
        text: inputText.trim(),
        position: { x: 20, y: 20 }, // Initial position
      };
      setNotes([...notes, newNote]);
      setInputText('');
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter note text..."
      />
      <button onClick={handleAddNote}>Add Note</button>
      {notes.map((note) => (
        <DraggableNote
          key={note.id}
          id={note.id}
          text={note.text}
          position={note.position}
          setPosition={(newPosition) => {
            const updatedNotes = [...notes];
            updatedNotes.find((n) => n.id === note.id).position = newPosition;
            setNotes(updatedNotes);
          }}
        />
      ))}
    </div>
  );
};

export default App;
