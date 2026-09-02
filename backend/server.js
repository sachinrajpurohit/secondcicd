const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Docker Compose ka MONGO_URI environment variable read karega
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoDB';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('DB Connection Error:', err));

// Simple Todo Schema & Model
const TodoSchema = new mongoose.Schema({ task: String });
const Todo = mongoose.model('Todo', TodoSchema);

// API Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ task: req.body.task });
  await newTodo.save();
  res.json(newTodo);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
