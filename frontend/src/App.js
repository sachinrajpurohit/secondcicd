import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  // Docker Compose wala URL use hoga, fallback local host par hai
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://65.2.5.89:5001';

  useEffect(() => {
    fetch(`${API_URL}/api/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, [API_URL]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input) return;

    const res = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setInput('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>dooooockerized MERN Todo App</h2>
      <form onSubmit={addTodo}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="New Task..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => <li key={index}>{todo.task}</li>)}
      </ul>
    </div>
  );
}

export default App;
