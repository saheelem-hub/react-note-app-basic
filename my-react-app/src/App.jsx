import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("bg-yellow-200");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const colors = ["bg-yellow-200", "bg-red-200", "bg-green-200", "bg-blue-200", "bg-purple-200"];
  function addNote() {
    if (!title.trim() && !content.trim()) {
      alert("Please enter a note");
      return;
    }
    if (editId !== null) {
      setNotes(notes.map((note) =>
        note.id === editId ? { ...note, title, content, color } : note
      ));
      setEditId(null);
    } else {
      setNotes([...notes, {  id: Date.now(), title, content, color }]);
    }
    setTitle("");
    setContent("");
    setColor("bg-yellow-200");
  }
  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
    setEditId(note.id);
  }
  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-5">My Notes</h1>
      <input type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-3 border rounded mb-5" />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded mb-3" />
      <textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 border rounded mb-3" />
      <div className="flex gap-3 mb-4">
        {colors.map((c) => (
          <button key={c} onClick={() => setColor(c)} className={`${c} w-7 h-7 rounded-full border-2 ${color === c ? "border-black" : "border-transparent"}`} />
        ))}
      </div>
      <button onClick={addNote} className="bg-blue-500 text-white px-5 py-2 rounded mb-8">
        {editId !== null ? "Update Note" : "Add Note"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className={`${note.color} p-4 rounded-lg shadow`}>
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="mb-4">{note.content}</p>
            <div className="flex gap-3">
              <button onClick={() => editNote(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}