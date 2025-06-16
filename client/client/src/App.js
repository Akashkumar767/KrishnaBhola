import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students").then(res => {
      setStudents(res.data);
    });
  }, []);

  const addStudent = () => {
    axios.post("http://localhost:5000/students", { name }).then(() => {
      setStudents([...students, [students.length + 1, name]]);
      setName("");
    });
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Student Manager</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addStudent}>Add</button>
      <ul>
        {students.map(([id, name]) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

